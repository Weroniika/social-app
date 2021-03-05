import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";

const Form = ({ setCurrentId, currentId }) => {
  const initialState = {
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  };
  const dispatch = useDispatch();
  const [postData, setPostData] = useState(initialState);
  const classes = useStyles;
  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const onChange = (e) => {
    setPostData({ ...postData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = (e) => {
    console.log(user?.result);
    const name = !user?.result.googleId
      ? `${user?.result?.firstName} ${user?.result?.lastName}`
      : `${user?.result.name}`;
    e.preventDefault();
    if (postData.title !== "" && postData.message !== "") {
      if (currentId !== null) {
        dispatch(
          updatePost(currentId, {
            ...postData,
            name: name,
          })
        );
      } else {
        dispatch(
          createPost({
            ...postData,
            name: name,
          })
        );
      }
      clearForm();
    }
  };

  const clearForm = () => {
    setPostData({ ...initialState });
    setCurrentId(null);
  };

  if (!user?.result?.email) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={(event) => onSubmit(event)}
      >
        <Typography variant="h6">
          {currentId ? "Update" : "Create"} a Memory
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(event) => onChange(event)}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(event) => onChange(event)}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(event) =>
            setPostData({ ...postData, tags: event.target.value.split(",") })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          classes={classes.buttonSubmit}
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onClick={(event) => onSubmit(event)}
        >
          Submit
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          type="button"
          fullWidth
          onClick={() => clearForm()}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
