import { appConfig } from "@configs/app.config";
import { S3 } from "aws-sdk";

export const s3Client = new S3({
  endpoint: appConfig.S3_ENDPOINT,
  s3ForcePathStyle: true
})