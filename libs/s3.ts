import { S3 } from "aws-sdk";
import { PassThrough } from "stream";

export const uploadToS3 = (bucket: string, key: string, buffer: Buffer) => {
  const s3 = new S3();

  return s3.upload({
    Bucket: bucket,
    Key: key,
    Body: buffer
  }).promise();
};

export const createS3UploadStream = (bucket: string, key: string) => {
  const s3 = new S3();
  const pass = new PassThrough();

  return {
    writeStream: pass,
    promise: s3.upload({
      Bucket: bucket,
      Key: key,
      Body: pass
    }).promise()
  };
};
