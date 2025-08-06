import { Construct } from "constructs";
import { DynamodbTable } from "../../.gen/providers/aws/dynamodb-table";

export function createUserTable(scope: Construct): DynamodbTable {
  return new DynamodbTable(scope, "UserTable", {
    name: "users",
    billingMode: "PAY_PER_REQUEST",
    hashKey: "id",
    attribute: [
      {
        name: "id",
        type: "S",
      },
    ],
  });
}
