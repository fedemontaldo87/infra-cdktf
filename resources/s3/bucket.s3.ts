import { Construct } from "constructs";
import { S3Bucket } from "../../.gen/providers/aws/s3-bucket";

export function createBucket(scope: Construct): S3Bucket {
  return new S3Bucket(scope, "user-avatars-bucket", {
    bucket: "user-avatars-bucket-cdktf",
    forceDestroy: true,
  });
}
