import mongoose from 'mongoose';
import { PostRepository } from '../../domain/post/PostRepository.js';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostModel = mongoose.model('Post', postSchema);

export class MongoPostRepository extends PostRepository {
  async save(post) {
    const created = await PostModel.create(post);
    return created;
  }

  async findById(id) {
    return await PostModel.findById(id);
  }

  async findAll() {
    return await PostModel.find();
  }
}