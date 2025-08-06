import { SQSEvent } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({});

const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const { id, username, avatar } = JSON.parse(record.body);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: "avatars-cdktf",
        Key: `${id}.jpg`,
        Body: Buffer.from(avatar, "base64"),
        ContentEncoding: "base64",
        ContentType: "image/jpeg",
        Metadata: {
          uploadedBy: username,
        },
      })
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Avatares procesados." }),
  };
};

export const main = middyfy(handler);
