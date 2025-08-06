import { config } from "dotenv";

// Cargar variables de entorno desde .env
config();

// Helper para asegurar que una variable exista
function requireEnv(varName: string): string {
  const value = process.env[varName];
  if (!value) throw new Error(`❌ Faltante variable de entorno: ${varName}`);
  return value;
}

export const appConfig = {
  ACCOUNT: requireEnv("ACCOUNT"),
  REGION: requireEnv("REGION"),
  TOPIC_NAME: "signup",

  DYNAMODB_ENDPOINT: requireEnv("DYNAMODB_ENDPOINT"),
  SNS_ENDPOINT: requireEnv("SNS_ENDPOINT"),
  S3_ENDPOINT: requireEnv("S3_ENDPOINT"),
  SES_ENDPOINT: requireEnv("SES_ENDPOINT"),
  EMAIL_FROM: requireEnv("EMAIL_FROM"),
};
