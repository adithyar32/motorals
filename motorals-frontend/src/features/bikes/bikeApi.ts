import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import type { Bike } from "./bikeTypes";

export const fetchBikes = createAsyncThunk<Bike[]>(
  "bikes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<Bike[]>("/api/bikes");
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Failed to load bikes");
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
