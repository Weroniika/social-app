import React from "react";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import {Grid} from "@material-ui/core";
import Post from "../Post";

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  return (
    <Grid className={classes.container}>
        {posts.map((post) =>(
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              {post.title}
              <Post post={post}/>
            </Grid>
        ))}
    </Grid>
  );
};

export default Posts;
