const prod = {
  url: {
    CLIENT_URL: "https://zealous-nightingale-b5cf8d.netlify.app",
  },
};

const dev = {
  url: {
    CLIENT_URL: "http://localhost:3000",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
