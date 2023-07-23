import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllUserSchedule } from "../../services";

export const getAllUserSchedule = createAsyncThunk(
  "schedule/getAllUserSchedule",
  async (userId, thunkAPI) => {
    try {
      const response = await GetAllUserSchedule(userId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    schedules: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(getAllUserSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = scheduleSlice;

export default reducer;
