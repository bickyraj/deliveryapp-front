import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

import AuthService from "../services/auth.service";

export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then((data) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        });
        return Promise.resolve();
    },
    (error) => {
        dispatch({
          type: LOGIN_FAIL
        });

        return Promise.reject();
    });
}

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT
  });
};