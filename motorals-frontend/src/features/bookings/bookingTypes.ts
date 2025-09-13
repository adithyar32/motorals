export interface Booking {
  id: number;
  userId: number;
  bikeModel: string;           
  registrationNumber: string;
  startTime: string;         
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  totalCost?: number;
}

export interface CreateBookingRequest {
  bikeId: number;
  startTime: string;
  endTime: string;   
}

export interface BookingsState {
  items: Booking[];
  loading: boolean;
  error: string | null;
  createdId?: number;
}
