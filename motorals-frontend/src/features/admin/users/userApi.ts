import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import type { AdminUser } from "./userTypes";

export const fetchAllUsers = createAsyncThunk<AdminUser[]>(
  "adminUsers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<AdminUser[]>("/api/admin/users");
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Failed to fetch users");
    }
  }
);
