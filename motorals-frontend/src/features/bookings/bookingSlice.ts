import { createSlice } from "@reduxjs/toolkit";
import type { BookingsState } from "./bookingTypes";
import { createBooking, fetchMyBookings } from "./bookingApi";

const initialState: BookingsState = {
  items: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchMyBookings.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchMyBookings.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload; })
      .addCase(fetchMyBookings.rejected, (s, { payload }) => { s.loading = false; s.error = payload as string; })
      // create
      .addCase(createBooking.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(createBooking.fulfilled, (s) => { s.loading = false; })
      .addCase(createBooking.rejected, (s, { payload }) => { s.loading = false; s.error = payload as string; });
  },
});

export default bookingSlice.reducer;
