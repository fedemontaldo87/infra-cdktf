import { Construct } from "constructs";
import { SnsTopic } from "../../.gen/providers/aws/sns-topic";
import { SnsTopicSubscription } from "../../.gen/providers/aws/sns-topic-subscription";
import { SqsQueue } from "../../.gen/providers/aws/sqs-queue";

export function createSignupTopic(scope: Construct, queues: SqsQueue[]): SnsTopic {
  const topic = new SnsTopic(scope, "SignupTopic", {
    name: "signup-topic",
  });

  // Creamos las suscripciones de forma explícita
  queues.forEach((queue, index) => {
    new SnsTopicSubscription(scope, `SignupSubscription${index}`, {
      topicArn: topic.arn,
      protocol: "sqs",
      endpoint: queue.arn,
    });
  });

  return topic;
}
