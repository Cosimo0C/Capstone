import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/login";
import prefReducer from "../reducers/preferiti";

const rootReducer = combineReducers({
  pref: prefReducer,
  auth: authReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
