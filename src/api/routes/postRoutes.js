import { Router } from 'express';
import { CreatePost } from '../../application/post/CreatePost.js';
import { GetPost } from '../../application/post/GetPost.js';
import { ListPosts } from '../../application/post/ListPosts.js';

const router = Router();

export const postRoutes = (repo, kafkaProducer) => {
  router.post('/', async (req, res) => {
    try {
      const { title, content } = req.body;
      const useCase = new CreatePost(repo, kafkaProducer);
      const result = await useCase.execute({ title, content });
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const useCase = new ListPosts(repo);
      const posts = await useCase.execute();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const useCase = new GetPost(repo);
      const post = await useCase.execute(req.params.id);
      res.json(post);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });

  return router;
};