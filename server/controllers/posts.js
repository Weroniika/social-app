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
    console.log(req.body);
    const post = await Post.create(postData);
    const posts = await Post.find({});

    res.status(201).json({
      message: "get posts successfully",
      posts: posts,
      post: post,
    });
  } catch (error) {
    res.status(409).json({error });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that id");

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { _id, title, message, creator, selectedFile, tags },
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
    const posts = await Post.find({})

    res.status(200).json({
      message: "deleted Successfully",
      posts: posts
    });
  } catch (error) {
    res.status(409).json({ error });
  }
};
