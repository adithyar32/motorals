import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import type { AdminBooking } from "@/features/admin/bookings/bookingTypes";

export const fetchAllBookings = createAsyncThunk<AdminBooking[]>(
  "adminBookings/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<AdminBooking[]>("/api/admin/bookings");
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Failed to fetch bookings");
    }
  }
);
