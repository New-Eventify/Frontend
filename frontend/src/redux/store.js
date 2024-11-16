import { configureStore } from "@reduxjs/toolkit";
import authViewReducer from "./reducers/authViewSlice";

export const store = configureStore({
  reducer: {
    authView: authViewReducer,
  },
});
