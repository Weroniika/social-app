import * as actions from "../constants/actionTypes";

const reducer = (posts = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL:
      return action.payload.posts;

    case actions.CREATE_POST:
      return [...posts, action.payload.post];

    case actions.DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);

    case actions.UPDATE_POST:
      return posts.map((post) =>
        post._id === action.payload.post._id ? action.payload.post : post
      );
    default:
      return posts;
  }
};

export default reducer;
