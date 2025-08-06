import { appConfig } from "@configs/app.config";
import { sesClient } from "@service/ses.service";
import { SQSEvent, SQSHandler } from "aws-lambda";

const processAvatar: SQSHandler = async (event: SQSEvent) => {
  const data = JSON.parse(JSON.parse(event.Records[0].body).Message);

  const email = data.email;

  await sesClient.sendEmail({
    Destination: {
      ToAddresses: [
        email
      ]
    },
    Message: {
      Body: {
        Text: {
          Data: "Welcome"
        }
      },
      Subject: {
        Data: "Welcome"
      }
    },
    Source: appConfig.EMAIL_FROM
  }).promise()
};

export const main = processAvatar;
