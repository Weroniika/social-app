import axios from "axios";
import {config}  from "../constants/env"

const url = config.url.API_URL;
const options = {
  withCredentials: true,
};

export const fetchAll = () => {
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

export const likePost = (id) => {
  return axios.patch(`${url}/${id}/likePost`, options);
};
