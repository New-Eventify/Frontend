import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: localStorage.getItem("token") || null,
};
console.log(initialState);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.isLoggedIn = true;
      state.user = user;
      state.token = token;
      console.log(user);

      // Store in localStorage
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    resetUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;

      // Clear from localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

// Export actions
export const { setUser, resetUser } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectToken = (state) => state.user.token;

// Reducer
export default userSlice.reducer;
