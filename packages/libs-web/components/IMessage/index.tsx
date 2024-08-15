import { message } from 'antd';

message.config({

  duration: 1,
  maxCount: 2
})

export const IMessage: typeof message = message;

export default IMessage;
