import * as postsApi from "../api";
import * as actions from "../constants/actionTypes"

export const fetchAll = () => (dispatch) => {
  try {
    postsApi.fetchAll().then(({ data }) => {
      dispatch({
        type: actions.FETCH_ALL,
        payload: data,
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const createPost = (postData) => (dispatch) => {
  try {
    postsApi.createPost(postData).then(({ data }) => {
      dispatch({
        type: actions.CREATE_POST,
        payload: data,
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};


export const updatePost = (_id, postData) => (dispatch) => {
  try {
    postsApi.updatePost(_id, postData).then(({ data }) => {
      dispatch({
        type: actions.UPDATE_POST,
        payload: data,
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const deletePost = (_id) => (dispatch) => {
  try {
    postsApi.deletePost(_id).then(({ data }) => {
      dispatch({
        type: actions.DELETE_POST,
        payload: data,
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const likePost = (_id) => (dispatch) => {
  try {
    postsApi.likePost(_id).then(({ data }) => {
      dispatch({
        type: actions.UPDATE_POST,
        payload: data,
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};
