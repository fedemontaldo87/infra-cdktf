import { Construct } from "constructs";
import { IamRole } from "../../.gen/providers/aws/iam-role";
import { DataAwsIamPolicyDocument } from "../../.gen/providers/aws/data-aws-iam-policy-document";
import { S3Bucket } from "../../.gen/providers/aws/s3-bucket";
import { SqsQueue } from "../../.gen/providers/aws/sqs-queue";
import { DynamodbTable } from "../../.gen/providers/aws/dynamodb-table";


export function createLambdaExecutorRole(
  scope: Construct,
  ddbTable: DynamodbTable,
  s3Bucket: S3Bucket,
  queue: SqsQueue
): IamRole {
  const policyDoc = new DataAwsIamPolicyDocument(scope, "LambdaPolicyDoc", {
    statement: [
      {
        effect: "Allow",
        actions: ["dynamodb:PutItem"],
        resources: [ddbTable.arn],
      },
      {
        effect: "Allow",
        actions: ["ses:SendEmail", "ses:SendRawEmail"],
        resources: ["*"],
      },
      {
        effect: "Allow",
        actions: ["s3:PutObject", "s3:PutObjectAcl"],
        resources: [`${s3Bucket.arn}/*`],
      },
      {
        effect: "Allow",
        actions: ["sns:*"],
        resources: ["*"],
      },
      {
        effect: "Allow",
        actions: ["sqs:ReceiveMessage", "sqs:DeleteMessage", "sqs:GetQueueAttributes"],
        resources: [queue.arn],
      },
    ],
  });

  return new IamRole(scope, "LambdaExecutorDefaultRole", {
    name: "LambdaExecutorDefaultRole",
    assumeRolePolicy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: {
            Service: "lambda.amazonaws.com",
          },
          Action: "sts:AssumeRole",
        },
      ],
    }),
    inlinePolicy: [
      {
        name: "LambdaFullPolicy",
        policy: policyDoc.json,
      },
    ],
  });
}
