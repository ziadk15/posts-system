import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../infrastructure/db/database.js';
import { MongoPostRepository } from '../infrastructure/db/MongoPostRepository.js';
import { KafkaProducer } from '../infrastructure/messaging/KafkaProducer.js';
import { KafkaConsumer } from '../infrastructure/messaging/KafkaConsumer.js';
import { postRoutes } from './routes/postRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

const start = async () => {
  try {
    // 1. database
    await connectDB();

    // 2. kafka
    const kafkaProducer = new KafkaProducer();
    await kafkaProducer.connect();

    const kafkaConsumer = new KafkaConsumer();
    await kafkaConsumer.connect();
    await kafkaConsumer.listen();

    // 3. repository
    const repo = new MongoPostRepository();

    // 4. routes
    app.use('/posts', postRoutes(repo, kafkaProducer));

    // 5. server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
};

start();