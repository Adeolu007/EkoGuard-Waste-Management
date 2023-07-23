import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScheduleWasteRecycling } from "../../services";

export const scheduleWasteRecycling = createAsyncThunk(
  "wasteRecycling/scheduleWasteRecycling",
  async ({
    pickupAddress,
    pickUpDate,
    bin,
    bag,
    quantityOfBagsOrBins,
    requestStatus,
    binQuantity,
    refLocationId,
    userId,
    categoryId,
  }) => {
    try {
      const response = await ScheduleWasteRecycling({
        pickupAddress,
        pickUpDate,
        bin,
        bag,
        quantityOfBagsOrBins,
        requestStatus,
        binQuantity,
        refLocationId,
        userId,
        categoryId,
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  }
);

const wasteRecyclingSlice = createSlice({
  name: "wasteRecycling",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scheduleWasteRecycling.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scheduleWasteRecycling.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(scheduleWasteRecycling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer } = wasteRecyclingSlice;

export default reducer;
