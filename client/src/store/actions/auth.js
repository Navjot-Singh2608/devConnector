import api from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./types";

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    return;
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
    return;
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users/register", formData);
    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/auth/login", formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    if (res?.data?.token) {
      setAuthToken(res?.data?.token);
    }

    dispatch(loadUser());
    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: LOGIN_FAIL,
      payload: ""
    });
  }
};

// Logout
export const logout = () => async (dispatch) =>
  dispatch({
    type: LOGOUT,
    payload: ""
  });
