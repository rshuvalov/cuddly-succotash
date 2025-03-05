import amqplib from 'amqplib';
import config from '../config';

export enum RabbitmqQueues {
  signInStats = 'sign-in-stats'
}

let producer;
let consumer;

export const sendMessage = async ({ msg, destination = RabbitmqQueues.signInStats }: { msg: string, destination?: RabbitmqQueues }): Promise<void> => {  
  producer.sendToQueue(destination, Buffer.from(msg));
};

export const init = async () => {  
  const conn = await amqplib.connect(config.rabbitmq.uri);

  producer = await conn.createChannel();
  consumer = await conn.createChannel();

  await consumer.assertQueue(RabbitmqQueues.signInStats);
  
  consumer.consume(RabbitmqQueues.signInStats, (msg) => {
    if (msg !== null) {
      console.log('RabbitMQ message received', msg.content.toString());
      consumer.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });
}