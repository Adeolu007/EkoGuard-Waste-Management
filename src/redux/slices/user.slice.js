import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUserByEmail, UpdateUserDetails, VerifyEmail } from "../../services";

// Async thunk
export const getUserByEmail = createAsyncThunk(
  "user/getUserByEmail",
  async (email) => {
    try {
      const response = await GetUserByEmail(email);
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async ({
    firstName,
    lastName,
    otherName,
    email,
    phoneNumber,
    gender,
    address,
    id,
  }) => {
    try {
      const response = await UpdateUserDetails({
        firstName,
        lastName,
        otherName,
        email,
        phoneNumber,
        gender,
        address,
        id,
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "emailVerification/verifyEmail",
  async (userId) => {
    try {
      const response = await VerifyEmail(userId);
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //update user
    builder
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //verify email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer } = userSlice;

export default reducer;
