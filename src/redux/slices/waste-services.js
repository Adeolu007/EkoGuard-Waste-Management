import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScheduleWasteDisposal } from "../../services";

export const scheduleWasteDisposal = createAsyncThunk(
  "wasteDisposal/scheduleWasteDisposal",
  async ({ binRequestDto, scheduleDto, refLocationId, userId }) => {
    try {
      const response = await ScheduleWasteDisposal({
        binRequestDto,
        refLocationId,
        scheduleDto,
        userId,
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  }
);

const wasteDisposalSlice = createSlice({
  name: "wasteDisposal",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scheduleWasteDisposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scheduleWasteDisposal.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(scheduleWasteDisposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer } = wasteDisposalSlice;

export default reducer;
