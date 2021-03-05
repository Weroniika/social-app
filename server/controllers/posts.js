import Post from "../models/Post.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      message: "get posts successfully",
      posts: posts,
      statusCode: 200,
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const createPost = async (req, res) => {
  try {
    const postData = req.body;
    const post = await Post.create({ ...postData, creator: req.userId, createdAt: new Date().toISOString()});
    const posts = await Post.find({});

    res.status(201).json({
      message: "get posts successfully",
      posts: posts,
      post: post,
    });
  } catch (error) {
    res.status(409).json({ error });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const postData = req.body;
    console.log(postData)

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that id");

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      {...postData, creator: req.userId },
      {
        new: true,
      }
    );

    res.status(201).json({
      message: "update post successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(409).json({ error });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");

    await Post.findByIdAndRemove(id);

    res.status(200).json({
      message: "deleted Successfully",
    });
  } catch (error) {
    res.status(409).json({ error });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");

    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json({
      message: "Like count update Successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(409).json({ error });
  }
};
