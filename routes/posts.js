import express from 'express';
import { createNewPost, deletePost, getAllPost, getSinglePost, updatePost } from '../controller/postController.js';
const router = express.Router();

router.get('/', getAllPost)

router.get('/:id', getSinglePost)

router.post('/', createNewPost);

router.put('/:id', updatePost)

router.delete('/:id', deletePost)

export default router