# infra-cdktf

> Migración de una arquitectura Serverless con LocalStack a CDK for Terraform (CDKTF) — moderna, modular y lista para producción local.

## 🚀 Objetivo

Este proyecto demuestra cómo migrar una infraestructura construida originalmente con **Serverless Framework** a una solución basada en **CDK for Terraform (CDKTF)**, manteniendo la ejecución local mediante **LocalStack**.

👉 Inspirado en: [theZeuses/serverless-localstack-aws](https://github.com/theZeuses/serverless-localstack-aws)

---

## 📦 Stack tecnológico

- **CDK for Terraform (CDKTF)** con TypeScript
- **LocalStack v3** (servicios simulados de AWS)
- **AWS Services**: Lambda, SQS, SNS, DynamoDB, S3, IAM, SES
- **Node.js** (funciones Lambda compiladas)
- **Docker** (LocalStack runtime)

---

## 🔄 ¿Por qué migrar de Serverless Framework a CDKTF?

| Característica         | Serverless Framework | CDK for Terraform (CDKTF) |
|------------------------|----------------------|---------------------------|
| Lenguaje de infra      | YAML                 | TypeScript / Python / etc |
| Modularidad            | ❌ Limitada          | ✅ Alta                   |
| Reutilización de código| ❌ Poca              | ✅ Completa               |
| Ecosistema Terraform   | ❌ No                | ✅ Total                  |
| Control de cambios     | ✅ Sí                | ✅ Sí                     |

**Beneficio clave:** CDKTF permite usar el mismo lenguaje que la app (TS), mayor control y mantenibilidad de la infraestructura.

---

## 🧠 Estructura del proyecto

```
infra-cdktf/
├── compiled-zips/           # Lambdas ya empaquetadas
├── configs/                 # Configuración global
│   └── app.config.ts
├── resources/               # Recursos de AWS (SQS, S3, Lambda, etc.)
├── libs/                    # Utilidades (creación de Lambdas, middlewares)
├── stacks/
│   └── infra-stack.ts       # Infraestructura principal
├── .gen/                    # Código generado por CDKTF
├── .env                     # Variables de entorno
├── .gitignore
├── main.ts                  # Punto de entrada CDKTF
└── README.md
```

---

## ⚙️ Cómo usar

### 1. Clonar el proyecto

```bash
git clone git@github.com-fedemontaldo87:fedemontaldo87/infra-cdktf.git
cd infra-cdktf
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```env
# .env
ACCOUNT=000000000000
REGION=us-east-1
DYNAMODB_ENDPOINT=http://localhost:4566
SNS_ENDPOINT=http://localhost:4566
S3_ENDPOINT=http://localhost:4566
SES_ENDPOINT=http://localhost:4566
EMAIL_FROM=no-reply@demo.com
```

### 4. Levantar LocalStack

```bash
docker-compose up
```

> Asegurate de tener `/var/run/docker.sock:/var/run/docker.sock` montado.

### 5. Generar infra y aplicar

```bash
npm run cdktf:generate   # genera código de Terraform
npm run cdktf:deploy     # aplica infraestructura
```

---

## 🧪 Verificar que todo funcione

Entrar al contenedor:

```bash
docker exec -it localstack_main bash
```

Ver Lambdas:

```bash
awslocal lambda list-functions
```

Ver colas:

```bash
awslocal sqs list-queues
```

---

## 📘 Créditos

Este proyecto fue adaptado y expandido a partir de:

- https://github.com/theZeuses/serverless-localstack-aws
- CDKTF + LocalStack + Terraform best practices

---

## ✨ Futuras mejoras

- Agregar CI/CD con GitHub Actions
- Tests automatizados para Lambdas
- Diagrama de arquitectura
- Ejemplo real de integración
