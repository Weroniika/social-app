import axios from "axios";

const url = "http://localhost:5000/posts";
const options = {
  withCredentials: true,
};

export const getPosts = () => {
  return axios.get(url, options);
};

export const createPost = (postData) => {
  return axios.post(url, postData, options);
};

export const updatePost = (id, postData) => {
  return axios.patch(`${url}/${id}`, postData, options);
};

export const deletePost = (id) => {
  return axios.delete(`${url}/${id}`, options);
};
