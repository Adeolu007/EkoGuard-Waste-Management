import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Define your initial state here
  userEmail: null,
};

const userEmailSlice = createSlice({
  name: "userEmail",
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    clearUserEmail: (state) => {
      state.userEmail = null;
    },
  },
});

export const { setUserEmail, clearUserEmail } = userEmailSlice.actions;

const { reducer } = userEmailSlice;

export default reducer;
