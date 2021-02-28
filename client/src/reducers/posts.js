const reducer = (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;

    case "SAVE_POST":
      return [...posts, action.payload];

    default:
      return posts;
  }
};

export default reducer;
