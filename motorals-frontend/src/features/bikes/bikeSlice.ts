import { createSlice } from "@reduxjs/toolkit";
import type { BikesState } from "./bikeTypes";
import { fetchBikes, fetchBikeById, fetchBikesByCategoryId } from "./bikeApi";

const initialState: BikesState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

const bikeSlice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    clearSelected(state) { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchBikes.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchBikes.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload; })
      .addCase(fetchBikes.rejected, (s, { payload }) => { s.loading = false; s.error = payload as string; })

      .addCase(fetchBikeById.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchBikeById.fulfilled, (s, { payload }) => { s.loading = false; s.selected = payload; })
      .addCase(fetchBikeById.rejected, (s, { payload }) => { s.loading = false; s.error = payload as string; })
     
      .addCase(fetchBikesByCategoryId.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchBikesByCategoryId.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload; })
      .addCase(fetchBikesByCategoryId.rejected, (s, { payload }) => { s.loading = false; s.error = payload as string; });
  },
});

export const { clearSelected } = bikeSlice.actions;
export default bikeSlice.reducer;
