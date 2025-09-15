import { createSlice } from "@reduxjs/toolkit";
import type { AdminUsersState } from "./userTypes";
import { fetchAllUsers } from "./userApi";

const initialState: AdminUsersState = {
  items: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchAllUsers.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload; })
      .addCase(fetchAllUsers.rejected, (s, { payload }) => { s.loading = false; s.error = payload as string; });
  },
});

export default userSlice.reducer;
