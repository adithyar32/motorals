import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import type { Bike } from "./bikeTypes";

export const fetchAvailableBikes = createAsyncThunk(
  "bikes/fetchAvailable",
  async ({ startTime, endTime }: { startTime: string; endTime: string }, thunkAPI) => {
    try {
      const res = await api.get(`/api/bikes/available`, {
        params: { startTime, endTime }
      });
      return res.data as Bike[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch available bikes.....Login again");
    }
  }
);

export const fetchBikeById = createAsyncThunk<Bike, number>(
  "bikes/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get<Bike>(`/api/bikes/${id}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Bike not found");
    }
  }
);

export const fetchBikesByCategoryId = createAsyncThunk<Bike[], number>(
  "bikes/fetchByCategoryId",
  async (catId, { rejectWithValue }) => {
    try {
      const { data } = await api.get<Bike[]>(`/api/bikes/category/${catId}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Failed to load category bikes");
    }
  }
);
