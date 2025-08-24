export interface Bike {
  id: number;
  brand: string;
  model: string;
  registrationNumber: string;
  available: boolean;
  pricePerHour: number;
  category: string;     // category name from backend
  imageUrl?: string | null;
}

export interface BikesState {
  items: Bike[];
  selected: Bike | null;
  loading: boolean;
  error: string | null;
}
