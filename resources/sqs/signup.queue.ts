import { Construct } from "constructs";
import { SqsQueue } from "../../.gen/providers/aws/sqs-queue";

export function createProcessAvatarDLQ(scope: Construct): SqsQueue {
  return new SqsQueue(scope, "ProcessAvatarQueueDLQ", {
    name: "process-avatar-queue-dlq",
    fifoQueue: false,
  });
}

export function createProcessAvatarQueue(scope: Construct, dlq: SqsQueue): SqsQueue {
  return new SqsQueue(scope, "ProcessAvatarQueue", {
    name: "process-avatar-queue",
    fifoQueue: false,
    redrivePolicy: JSON.stringify({
      deadLetterTargetArn: dlq.arn,
      maxReceiveCount: 3,
    }),
  });
}

export function createProcessBioQueue(scope: Construct): SqsQueue {
  return new SqsQueue(scope, "ProcessBioQueue", {
    name: "process-bio-queue",
    fifoQueue: false,
  });
}

export function createProcessWelcomeEmailQueue(scope: Construct): SqsQueue {
  return new SqsQueue(scope, "ProcessWelcomeEmailQueue", {
    name: "process-welcome-email-queue",
    fifoQueue: false,
  });
}
