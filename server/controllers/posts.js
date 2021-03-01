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
    res.status(404).json({ message: error.message });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    const posts = await Post.find({});
    res.status(200).json({
      message: "get posts successfully",
      posts: posts,
      post: post,
      statusCode: 200,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const postData = req.body;
    console.log(req.body);
    const post = await Post.create(postData);
    const posts = await Post.find({});

    res.status(201).json({
      message: "get posts successfully",
      posts: posts,
      post: post,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that id");

    const post = req.body;
    const updatedPost = await Post.findByIdAndUpdate(_id, {...post, _id}, {
      new: true,
    });
    const posts = await Post.find({});

    res.status(201).json({
      message: "update post successfully",
      posts: posts,
      post: updatedPost,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
