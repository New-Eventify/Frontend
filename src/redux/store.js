import { configureStore } from "@reduxjs/toolkit";
import authViewReducer from "./reducers/authViewSlice";
import userReducer from "./reducers/userSlice";
import userMenuReducer from "./reducers/userMenuSlice";

export const store = configureStore({
  reducer: {
    authView: authViewReducer,
    user: userReducer,
    userMenu: userMenuReducer,
  },
});
