import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignUp: false,
};

const authViewSlice = createSlice({
  name: "authView",
  initialState,
  reducers: {
    toggleSignUp: (state) => {
      state.isSignUp = !state.isSignUp;
    },
    setIsSignUp: (state, action) => {
      state.isSignUp = action.payload;
    },
  },
});

export const { toggleSignUp, setIsSignUp } = authViewSlice.actions;
export const selectIsSignUp = initialState.isSignUp;
export default authViewSlice.reducer;
