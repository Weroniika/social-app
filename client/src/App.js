import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from "./images/memories.png";
import Posts from "./components/Posts";
import Form from "./components/Form";
import useStyles from "./styles";
import { getPosts } from "./api";
import { fetchAll } from "./actions/posts";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  //const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(({ data: { posts } }) => {
      console.log(posts)
      dispatch({
        type: "FETCH_ALL",
        payload: posts
      })
    });
  });

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="30"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing=""
          >
            <Grid item xs={12} sm={7}>
              <Posts/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
