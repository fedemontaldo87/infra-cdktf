import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { nanoid } from "nanoid";
import { validate } from "isemail";

import schema from "./body.schema";

import { documentClient } from "@service/dynamodb.service";
import { snsClient } from "@service/sns.service";


const signup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	const topicArn = `arn:aws:sns:${process.env.REGION}:${process.env.ACCOUNT}:${process.env.TOPIC_NAME}`;

	const id = nanoid();

	const data = {
		...event.body,
		id
	}

	try {
		if(!validate(data.email)) {
			return formatJSONResponse({
				statusCode: 400,
				message: "Invalid Email"
			});
		}

		await documentClient.put({
			TableName: "users",
			Item: {
				...data
			}
		}).promise();
	
		await snsClient.publish({
			Message: JSON.stringify({ ...data }),
			TopicArn: topicArn
		}).promise()
	
		return formatJSONResponse({
			...data
		});
	} catch (err) {
		return formatJSONResponse({
			statusCode: 500,
			error: err
		});
	}
};

export const main = middyfy(signup);
