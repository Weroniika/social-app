import * as postsApi from "../api";

export const fetchAll = () => (dispatch) => {
  try {
    postsApi.getPosts().then(({ data: { posts } }) => {
      dispatch({
        type: "FETCH_ALL",
        payload: posts,
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};
