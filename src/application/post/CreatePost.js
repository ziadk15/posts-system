import { Post } from '../../domain/post/Post.js';

export class CreatePost {
  constructor(postRepository, kafkaProducer) {
    this.postRepository = postRepository;
    this.kafkaProducer = kafkaProducer;
  }

  async execute({ title, content }) {
    const post = new Post({ title, content });
    const saved = await this.postRepository.save(post);
    await this.kafkaProducer.publish('post.created', saved);
    return saved;
  }
}