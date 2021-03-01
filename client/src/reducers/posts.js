

const reducer = (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload.posts

    case "SAVE_POST":
      return [...posts, action.payload.post]

    case "UPDATE_POST":
      return posts.map((post) => post._id === action.payload.post._id? action.payload.post: post);

    default:
      return posts;
  }
};

export default reducer;
