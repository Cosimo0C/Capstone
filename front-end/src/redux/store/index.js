import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import mainReducer from "../reducers/preferiti";
import authReducer from "../reducers/login";

const rootReducer = combineReducers({
  pref: mainReducer,
  auth: authReducer,
});
const store = configureStore({
  reducer: mainReducer,
});
export default store;
