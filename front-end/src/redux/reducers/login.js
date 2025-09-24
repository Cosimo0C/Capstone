import { LOGIN_SUCCESS, LOGOUT } from "../action";

const initialState = {
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload, isLoggedIn: true };
    case LOGOUT:
      return { ...state, token: null, isLoggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
