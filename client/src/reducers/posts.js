import {FETCH_ALL, UPDATE_POST, DELETE_POST, CREATE_POST} from "../constants/actionTypes";

const reducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload.posts;

    case CREATE_POST:
      return [...posts, action.payload.post];

    case DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);

    case UPDATE_POST:
      return posts.map((post) =>
        post._id === action.payload.post._id ? action.payload.post : post
      );
    default:
      return posts;
  }
};

export default reducer;
