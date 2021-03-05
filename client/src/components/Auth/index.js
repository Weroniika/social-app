import React, { useState } from "react";
import {
  Avatar,
  Typography,
  Button,
  Paper,
  Grid,
  Container,
} from "@material-ui/core";
import Input from "./Input";
import Icon from "./Icon";
import { CLIENT_ID } from "../../secret_keys";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { auth, signup, signin } from "../../actions/auth";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const initState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState(initState);

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (
        formData.firstName !== "" &&
        formData.lastName !== "" &&
        formData.password !== "" &&
        formData.confirmPassword !== "" &&
        formData.password === formData.confirmPassword &&
        formData.email !== ""
      ) {
        let signUpData = formData;

        delete signUpData.confirmPassword;

        dispatch(signup(signUpData, history));
        setFormData(initState);
      } else {
        console.log("Inputs can't be empty");
      }
    } else {
      //login
      let signInData = formData;

      delete signInData.confirmPassword
      delete signInData.lastName
      delete signInData.firstName;

      dispatch(signin(signInData, history))
      setFormData(initState);
    }
  };

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  const googleFailure = (error) => {
    console.log(error);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(auth({ result, token }));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handlechange}
                  autoFocus
                  half
                  value={formData.firstName}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handlechange}
                  autoFocus
                  half
                  value={formData.lastName}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handlechange}
              type="email"
              value={formData.email}
            />
            <Input
              handleShowPassword={handleShowPassword}
              name="password"
              label="Password"
              handleChange={handlechange}
              type={showPassword ? "text" : "password"}
              value={formData.password}
            />
            {isSignUp && (
              <Input
                handleShowPassword={handleShowPassword}
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handlechange}
                type="password"
                value={formData.confirmPassword}
              />
            )}
          </Grid>
          <GoogleLogin
            clientId={CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                variant="contained"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Need and account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
