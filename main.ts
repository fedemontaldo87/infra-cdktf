import { App } from "cdktf";
import { InfraStack } from "./stacks/infra-stack";

const app = new App();
new InfraStack(app, "infra-cdktf");
app.synth();
