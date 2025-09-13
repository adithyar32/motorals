import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import type { Booking, CreateBookingRequest } from "./bookingTypes";

  export const fetchMyBookings = createAsyncThunk<Booking[]>(
    "bookings/fetchMine",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await api.get<Booking[]>("/api/user/bookings");
        return data;
      } catch (err: any) {
        return rejectWithValue(err?.response?.data?.message || "Failed to load bookings");
      }
    }
  );

  export const createBooking = createAsyncThunk<string, CreateBookingRequest>(
    "bookings/create",
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await api.post<string>("/api/user/bookings", payload);
        return data; // "Bike booked successfully"
      } catch (err: any) {
        return rejectWithValue(err?.response?.data?.message || "Booking failed");
      }
    }
  );
