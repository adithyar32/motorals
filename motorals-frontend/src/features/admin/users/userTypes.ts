export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "ROLE_USER" | "ROLE_ADMIN";
}

export interface AdminUsersState {
  items: AdminUser[];
  loading: boolean;
  error: string | null;
}
