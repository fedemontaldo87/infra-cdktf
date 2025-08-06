import { appConfig } from "@configs/app.config";
import { SES } from "aws-sdk";

export const sesClient = new SES({
  endpoint: appConfig.SES_ENDPOINT,
  region: appConfig.REGION, // opcional, pero recomendable
});
