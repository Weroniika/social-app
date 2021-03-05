import * as api from "../api";
import * as actions from "../constants/actionTypes"

export const fetchAll = () => (dispatch) => {
  try {
    api.fetchAll().then(({ data }) => {
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
    api.createPost(postData).then(({ data }) => {
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
    api.updatePost(_id, postData).then(({ data }) => {
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
    api.deletePost(_id).then(({ data }) => {
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
    api.likePost(_id).then(({ data }) => {
      dispatch({
        type: actions.UPDATE_POST,
        payload: data,
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};
