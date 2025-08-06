// Exports para usar en funciones CDK (infraestructura)
export {
  createProcessAvatarQueue,
  createProcessAvatarDLQ,
  createProcessBioQueue,
  createProcessWelcomeEmailQueue,
} from './signup.queue';

// Alias para usar en Lambdas (Fn::GetAtt)
export {
  createProcessAvatarQueue as ProcessAvatarQueue,
  createProcessAvatarDLQ as ProcessAvatarQueueDLQ,
  createProcessBioQueue as ProcessBioQueue,
  createProcessWelcomeEmailQueue as ProcessWelcomeEmailQueue,
} from './signup.queue';
