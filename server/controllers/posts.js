import Post from "../models/Post.js";

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
