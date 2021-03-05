import React, { useEffect, useState } from "react";
import { AppBar, Button, Typography, Avatar, Toolbar } from "@material-ui/core";
import memories from "../../images/memories.png";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/auth";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logOut = () => {
    dispatch(logout());
    setUser(null);
    history.push("/");
  };

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="30"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.firstName}
              src={user.result.imageUrl}
            >
              {user?.result.googleId ? "" : user.result.firstName.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.googleId
                ? user.result.name
                : `${user.result.firstName} ${user.result.lastName}`}
            </Typography>
            <Button
              onClick={() => logOut()}
              variant="contained"
              color="secondary"
            >
              Log out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
