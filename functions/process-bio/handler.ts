import { Context, SQSEvent, SQSHandler } from 'aws-lambda';

const processBio: SQSHandler = async (event: SQSEvent, context: Context) => {
  //TODO: process the bio text here

  console.log("=====Process BIO==========", event, context)
};

export const main = processBio;
