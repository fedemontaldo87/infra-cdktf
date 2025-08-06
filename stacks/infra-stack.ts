import { Construct } from "constructs";
import { TerraformStack } from "cdktf";
import { AwsProvider } from "../.gen/providers/aws/provider";
import * as path from "path";

// 👇 Importaciones de tus recursos
import {
  createProcessAvatarQueue,
  createProcessAvatarDLQ,
  createProcessBioQueue,
  createProcessWelcomeEmailQueue,
} from "../resources/sqs";
import { createUserTable } from "../resources/dynamodb";
import { createS3Bucket } from "../resources/s3";
import { createSignupTopic } from "../resources/sns";
import {
  attachSnsToSqsPolicy,
  createLambdaExecutorRole,
} from "../resources/policies";
import { createLambdaFunction } from "../libs/lambda";
import { appConfig } from "../configs/app.config";

export class InfraStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ✅ Provider corregido
    new AwsProvider(this, "Aws", {
      region: appConfig.REGION,
      accessKey: "test",
      secretKey: "test",
      skipCredentialsValidation: true,
      skipMetadataApiCheck: "true",
      skipRequestingAccountId: true,
      s3UsePathStyle: true,
      endpoints: [
        {
          s3: appConfig.S3_ENDPOINT,
          sns: appConfig.SNS_ENDPOINT,
          sqs: "http://localhost:4566",
          dynamodb: appConfig.DYNAMODB_ENDPOINT,
          ses: appConfig.SES_ENDPOINT,
          iam: "http://localhost:4566",
          lambda: "http://localhost:4566",
          sts: "http://localhost:4566",
        },
      ],
    });

    // 🔧 Recursos
    const avatarDLQ = createProcessAvatarDLQ(this);
    const avatarQueue = createProcessAvatarQueue(this, avatarDLQ);
    const bioQueue = createProcessBioQueue(this);
    const welcomeEmailQueue = createProcessWelcomeEmailQueue(this);
    const topic = createSignupTopic(this, [avatarQueue, bioQueue, welcomeEmailQueue]);
    const bucket = createS3Bucket(this);
    const table = createUserTable(this);

    // 🔐 IAM Role
    const role = createLambdaExecutorRole(this, table, bucket, avatarQueue);

    // 🔐 SNS → SQS Policy
    attachSnsToSqsPolicy(this, [avatarQueue, bioQueue, welcomeEmailQueue], topic.arn);

    // 📦 Ruta base a los zips
    const zipBasePath = path.resolve("compiled-zips");

    // 🧠 Lambda Functions
    createLambdaFunction(this, {
      id: "SignupLambda",
      functionName: "signup",
      zipFileName: path.join(zipBasePath, "signup.zip"),
      handler: "index.main",
      roleArn: role.arn,
      envVars: {
        REGION: appConfig.REGION,
        ACCOUNT: appConfig.ACCOUNT,
        TOPIC_NAME: appConfig.TOPIC_NAME,
        DYNAMODB_ENDPOINT: appConfig.DYNAMODB_ENDPOINT,
        SNS_ENDPOINT: appConfig.SNS_ENDPOINT,
        S3_ENDPOINT: appConfig.S3_ENDPOINT,
        SES_ENDPOINT: appConfig.SES_ENDPOINT,
        EMAIL_FROM: appConfig.EMAIL_FROM,
      },
    });

    createLambdaFunction(this, {
      id: "ProcessBioLambda",
      functionName: "processBio",
      zipFileName: path.join(zipBasePath, "process-bio.zip"),
      handler: "index.main",
      roleArn: role.arn,
    });

    createLambdaFunction(this, {
      id: "ProcessAvatarLambda",
      functionName: "processAvatar",
      zipFileName: path.join(zipBasePath, "process-avatar.zip"),
      handler: "index.main",
      roleArn: role.arn,
    });

    createLambdaFunction(this, {
      id: "ProcessAvatarRetryLambda",
      functionName: "processAvatarRetry",
      zipFileName: path.join(zipBasePath, "process-avatar-dlq.zip"),
      handler: "index.main",
      roleArn: role.arn,
    });

    createLambdaFunction(this, {
      id: "ProcessWelcomeEmailLambda",
      functionName: "processWelcomeEmail",
      zipFileName: path.join(zipBasePath, "process-welcome-email.zip"),
      handler: "index.main",
      roleArn: role.arn,
    });
  }
}
