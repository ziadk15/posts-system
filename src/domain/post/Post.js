export class Post {
  constructor({ title, content, createdAt }) {
    if (!title || title.trim() === '') {
      throw new Error('Title is required');
    }
    if (!content || content.trim() === '') {
      throw new Error('Content is required');
    }

    this.title = title.trim();
    this.content = content.trim();
    this.createdAt = createdAt || new Date();
  }
}