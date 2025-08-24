export type Role = "ROLE_USER" | "ROLE_ADMIN";

export interface AuthResponse {
  token: string;
  name: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  name: string | null;
  role: Role | null;
  loading: boolean;
  error: string | null;
}
