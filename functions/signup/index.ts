import schema from "./body.schema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "POST",
        path: "signup",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
