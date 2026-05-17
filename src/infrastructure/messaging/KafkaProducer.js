import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'posts-system',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();

export class KafkaProducer {
  async connect() {
    await producer.connect();
    console.log('Kafka Producer connected');
  }

  async publish(topic, message) {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }]
    });
    console.log(`Event sent to topic "${topic}":`, message);
  }

  async disconnect() {
    await producer.disconnect();
  }
}