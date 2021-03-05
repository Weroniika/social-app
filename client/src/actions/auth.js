import { LOGOUT, AUTH} from "../constants/actionTypes";
import * as api from "../api";

export const auth = (data) => (dispatch) => {
  try {
    dispatch({
      type: AUTH,
      data: data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const logout = () => (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const signup = (formData, history) => (dispatch) => {
  try {
    api.signUp(formData).then(({ data }) => {
      dispatch({
        type: AUTH,
        data: data,
      });
      history.push("/");
    });
  } catch (err) {
    console.log(err);
  }
};

export const signin = (formData, history) => (dispatch) => {
  try {
    api.signIn(formData).then(({ data }) => {
      dispatch({
        type: AUTH,
        data: data,
      });
      console.log(formData);
      history.push("/");
    });
  } catch (err) {
    console.log(err);
  }
};
