import { Context, SQSEvent, SQSHandler } from 'aws-lambda';

const processAvatar: SQSHandler = async (event: SQSEvent, context: Context) => {
  //TODO: handle failed jobs of ProcessAvatarQueue
  //retry: download image and upload to s3 as stream

  console.log("=====Process Avatar DLQ==========", event, context)
};

export const main = processAvatar;
