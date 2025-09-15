export interface AdminBooking {
  id: number;
  userId: number;
  userName?: string;
  bikeModel: string;
  registrationNumber: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  totalCost?: number;
}

export interface AdminBookingsState {
  items: AdminBooking[];
  loading: boolean;
  error: string | null;
}
