import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const userMenuSlice = createSlice({
  name: "userMenu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
      console.log(state.isOpen);
    },
    setMenu: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleMenu, setMenu } = userMenuSlice.actions;
export const selectMenu = (state) => state.userMenu.isOpen;

export default userMenuSlice.reducer;
