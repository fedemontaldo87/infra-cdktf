import { Construct } from "constructs";
import { SqsQueuePolicy } from "../../.gen/providers/aws/sqs-queue-policy";
import { SqsQueue } from "../../.gen/providers/aws/sqs-queue";

/**
 * Aplica una política para permitir que un SNS Topic publique mensajes a una lista de colas SQS.
 */
export function attachSnsToSqsPolicy(
  scope: Construct,
  queues: SqsQueue[],
  topicArn: string
): SqsQueuePolicy[] {
  return queues.map((queue, index) => {
    return new SqsQueuePolicy(scope, `SnsToSqsPolicy-${index}`, {
      queueUrl: queue.url, // 👈 propiedad correcta
      policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "AllowSNSPublish",
            Effect: "Allow",
            Principal: {
              Service: "sns.amazonaws.com",
            },
            Action: "sqs:SendMessage",
            Resource: queue.arn,
            Condition: {
              ArnEquals: {
                "aws:SourceArn": topicArn,
              },
            },
          },
        ],
      }),
    });
  });
}
