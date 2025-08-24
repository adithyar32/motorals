import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios"
import type { AuthResponse, LoginRequest, RegisterRequest } from "./authTypes";

export const login = createAsyncThunk<AuthResponse, LoginRequest>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>("/api/auth/login", payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk<AuthResponse, RegisterRequest>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>("/api/auth/register", payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Registration failed");
    }
  }
);
