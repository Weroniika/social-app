import express from "express";
import * as postsController from "../controllers/posts.js"

const router = express.Router();

router.get('/', postsController.getPosts)
router.post('/', postsController.createPost)
router.patch('/:id', postsController.updatePost)
router.get('/:id', postsController.getOnePost)

export default router;
