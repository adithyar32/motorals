export interface Bike {
  id: number;
  brand: string;
  model: string;
  registrationNumber: string;
  pricePerHour: number;
  category: string;
  imageUrl: string | null;
  imagePublicId: string | null;
}

export interface BikesState {
  items: Bike[];
  selected: Bike | null;
  loading: boolean;
  error: string | null;
}

