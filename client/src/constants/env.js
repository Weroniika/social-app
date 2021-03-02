const prod = {
  url: {
    API_URL: "https://social-app-memories.herokuapp.com/posts",
  },
};

const dev = {
  url: {
    API_URL: "http://localhost:5000/posts",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
