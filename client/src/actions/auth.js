import {LOGOUT, AUTH} from "../constants/actionTypes"

export const auth = (data) => (dispatch) => {
    try {
      dispatch({
          type: AUTH,
          data: data
      })
    } catch (err) {
        console.log(err.message);
    }
};


export const logout = (data) => (dispatch) => {
    try {
        dispatch({
            type: LOGOUT
        })
    } catch (err) {
        console.log(err.message);
    }
};
