import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { CONNECTION_URL } from "./config/config.js";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use('/posts', postRoutes)
app.use(cors({
    origin: [
        "http://localhost:3000",
    ],
    credentials: true
}));


const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
  });


mongoose.set('useFindAndModify', false);
