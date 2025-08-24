import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";
import { login, register } from "./authApi";

const initialToken = localStorage.getItem("motorals_token");
const initialName = localStorage.getItem("motorals_name");
const initialRole = localStorage.getItem("motorals_role") as AuthState["role"];

const initialState: AuthState = {
  token: initialToken,
  name: initialName,
  role: initialRole ?? null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.name = null;
      state.role = null;
      localStorage.removeItem("motorals_token");
      localStorage.removeItem("motorals_name");
      localStorage.removeItem("motorals_role");
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.token = payload.token;
        s.name = payload.name;
        s.role = payload.role;
        localStorage.setItem("motorals_token", payload.token);
        localStorage.setItem("motorals_name", payload.name);
        localStorage.setItem("motorals_role", payload.role);
      })
      .addCase(login.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = (payload as string) || "Login failed";
      })
      // register
      .addCase(register.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(register.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.token = payload.token;
        s.name = payload.name;
        s.role = payload.role;
        localStorage.setItem("motorals_token", payload.token);
        localStorage.setItem("motorals_name", payload.name);
        localStorage.setItem("motorals_role", payload.role);
      })
      .addCase(register.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = (payload as string) || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
