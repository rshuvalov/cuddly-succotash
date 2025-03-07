import amqplib from 'amqplib';
import config from '../config';

export enum RabbitmqQueues {
  signUps = 'sign-ups'
}

let producer;

export const sendMessage = async ({ msg, destination = RabbitmqQueues.signUps }: { msg: string, destination?: RabbitmqQueues }): Promise<void> => {  
  producer.sendToQueue(destination, Buffer.from(msg));
};

export const init = async () => {  
  const conn = await amqplib.connect(config.rabbitmq.uri);
  producer = await conn.createChannel();
}