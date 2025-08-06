import { Construct } from "constructs";
import { LambdaFunction } from "../.gen/providers/aws/lambda-function";
import * as path from "path";
import * as fs from "fs";
import * as crypto from "crypto";
import middy from "@middy/core";
import type { Handler } from "aws-lambda";

interface LambdaFunctionConfig {
  id: string;
  functionName: string;
  handler: string;
  zipFileName: string; // solo el nombre del archivo
  roleArn: string;
  envVars?: { [key: string]: string };
}

export function createLambdaFunction(scope: Construct, config: LambdaFunctionConfig): LambdaFunction {
  const fullPath = path.resolve("compiled-zips", config.zipFileName);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`❌ ZIP no encontrado: ${fullPath}`);
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const hash = crypto.createHash("sha256").update(fileBuffer).digest("base64");

  return new LambdaFunction(scope, config.id, {
    functionName: config.functionName,
    handler: config.handler,
    runtime: "nodejs18.x",
    filename: fullPath,
    sourceCodeHash: hash,
    role: config.roleArn,
    environment: config.envVars ? { variables: config.envVars } : undefined,
  });
}

// ✅ Export para funciones handler
export const middyfy = <T = any, R = any>(handler: Handler<T, R>) => {
  return middy(handler);
};
