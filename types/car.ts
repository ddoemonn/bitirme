export interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: string;
  mileage: string;
}

export interface CarData {
  id: number;
  brand: string;
  model: string;
  year: number;
  plate: string;
  status: string;
  category: string;
}

