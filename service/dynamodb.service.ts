import { DynamoDB } from "aws-sdk";
import { appConfig } from "@configs/app.config";

// ✅ Export directo para usar como `documentClient`
export const documentClient = new DynamoDB.DocumentClient({
  endpoint: appConfig.DYNAMODB_ENDPOINT,
  region: appConfig.REGION,
});

// ✅ Clase para métodos reutilizables (opcional, ya la tenías)
export class DynamoDBService {
  static async saveItem<T extends Record<string, unknown>>(tableName: string, item: T) {
    const params = {
      TableName: tableName,
      Item: item,
    };

    return documentClient.put(params).promise();
  }
}
