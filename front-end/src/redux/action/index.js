export const ADD_PREFERITI = "ADD_PREFERITI";
export const REMOVE_PREFERITI = "REMOVE_PREFERITI";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (token) => ({ type: LOGIN_SUCCESS, payload: token });
export const logout = () => ({ type: LOGOUT });
