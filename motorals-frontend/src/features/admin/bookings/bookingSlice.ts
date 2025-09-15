import { createSlice } from "@reduxjs/toolkit";
import type { AdminBookingsState } from "./bookingTypes";
import { fetchAllBookings } from "./bookingApi";

const initialState: AdminBookingsState = {
  items: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "adminBookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookings.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchAllBookings.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload; })
      .addCase(fetchAllBookings.rejected, (s, { payload }) => { s.loading = false; s.error = payload as string; });
  },
});

export default bookingSlice.reducer;
