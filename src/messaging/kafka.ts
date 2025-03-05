import { Kafka } from 'kafkajs';
import config from '../config';

export enum KafkaTopics {
  signInStats = 'sign-in-stats'
}

const kafka = new Kafka({
  clientId: 'local',
  brokers: [config.kafka.uri],
});

let producer;
let consumer;

export const sendMessage = async ({ msg, destination = KafkaTopics.signInStats }: { msg: string, destination?: KafkaTopics }): Promise<void> => {
  await producer.connect();
  await producer.send({
    topic: destination,
    messages: [{ value: msg }],
  });
  await producer.disconnect();
}

export const init = async (): Promise<void> => {
  consumer = kafka.consumer({ groupId: 'local-group-bla-bla-bla' });
  producer = kafka.producer({ allowAutoTopicCreation: true });
  await consumer.connect();
  await consumer.subscribe({ topic: KafkaTopics.signInStats, fromBeginning: false });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Kafka message received', Buffer.from(message.value).toString());
    }
  })
    .catch(err => {
      console.error(err);
    });
}
