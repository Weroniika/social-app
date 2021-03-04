import { AUTH, LOGOUT } from "../constants/actionTypes";

const initialState = {
  authData: {
    result: null,
    token: null,
  },
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return action?.data;

    case LOGOUT:
      localStorage.removeItem("profile")
      return initialState;
    default:
      return initialState;
  }
};

export default authReducer;
