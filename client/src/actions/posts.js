import * as postsApi from "../api";

export const fetchAll = () => (dispatch) => {
  try {
    postsApi.getPosts().then(({ data }) => {
      dispatch({
        type: "FETCH_ALL",
        payload: data,
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const savePost = (postData) => (dispatch) => {
  try {
    postsApi.createPost(postData).then(({ data }) => {
      dispatch({
        type: "SAVE_POST",
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
        type: "UPDATE_POST",
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
        type: "DELETE_POST",
        payload: data,
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};
