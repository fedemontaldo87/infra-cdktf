#!/bin/bash
set -e

echo "🔥 Ejecutando 00-init.sh dentro del contenedor"

awslocal iam create-role \
  --role-name lambda-execution-role \
  --assume-role-policy-document file:///etc/localstack/init/ready.d/lambda-trust.json

awslocal iam put-role-policy \
  --role-name lambda-execution-role \
  --policy-name lambda-inline-policy \
  --policy-document file:///etc/localstack/init/ready.d/lambda-policy.json

echo "✅ Rol creado automáticamente 🎉"
