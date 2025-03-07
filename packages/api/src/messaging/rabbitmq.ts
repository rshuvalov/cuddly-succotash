import amqplib from 'amqplib';
import config from '../config';
import { createUser } from '../users';

export enum RabbitmqQueues {
  signInStats = 'sign-ups'
}

let consumer;

export const init = async () => {  
  const conn = await amqplib.connect(config.rabbitmq.uri);

  consumer = await conn.createChannel();

  await consumer.assertQueue(RabbitmqQueues.signInStats);
  
  consumer.consume(RabbitmqQueues.signInStats, async (msg) => {
    if (msg !== null) {
      const user = JSON.parse(msg.content.toString());
      try {
        await createUser(user);
      } catch (err) {
        if (!err.message.includes('already created')) {
          throw err;
        }
      }
      consumer.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });
}