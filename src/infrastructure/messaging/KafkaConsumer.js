import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'posts-system',
  brokers: ['kafka:9092']
});

const consumer = kafka.consumer({ groupId: 'posts-group' });

export class KafkaConsumer {
  async connect() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'post.created', fromBeginning: true });
    console.log('Kafka Consumer connected and subscribed');
  }

  async listen() {
    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const post = JSON.parse(message.value.toString());
        console.log('New post event received:', post);
      }
    });
  }

  async disconnect() {
    await consumer.disconnect();
  }
}