import axios from "axios";
import { config } from "../constants/env";
const API = axios.create({ baseURL: config.API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
const options = {
  withCredentials: true,
};

export const fetchAll = () => {
  return API.get("/posts", options);
};

export const createPost = (postData) => {
  return API.post("/posts", postData, options);
};

export const updatePost = (id, postData) => {
  return API.patch(`/posts/${id}`, postData, options);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`, options);
};

export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`, options);
};

export const signUp = (formData) => {
  return API.post("/user/signup", formData, options);
};

export const signIn = (formData) => {
  return API.post("/user/signin", formData, options);
};
