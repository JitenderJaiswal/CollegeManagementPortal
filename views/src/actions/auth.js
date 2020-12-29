import {
  SIGNUP_START,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  CLEAR_AUTH_STATE,
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";

export function signup(email, password, confirmPassword, name, type) {
  return async (dispatch) => {
    const url = APIUrls.signup();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: getFormBody({
        email,
        password,
        confirm_password: confirmPassword,
        name,
        type,
      }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("data", data);
    if (data.success) {
      localStorage.setItem("token", data.data.token);
      dispatch(signupSuccessful(data.data.user));
      return;
    }
    dispatch(signupFailed(data.message));
  };
}

export function startSingup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}

export function signupSuccessful(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function login(email, password) {
  return async (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: getFormBody({ email, password }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("data", data);

    if (data.success) {
      localStorage.setItem("token", data.data.token);
      dispatch(loginSuccess(data.data.user));
      return;
    }
    dispatch(loginFailed(data.message));
  };
}

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}
