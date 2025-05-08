// Car model
export interface Car {
  carId: number;
  brand: string;
  model: string;
  year: number;
  dailyPrice: number;
  licensePlate: string;
  color?: string;
  kilometer: number;
  transmissionType?: string;
  fuelType?: string;
  isAvailable: boolean;
  isDeleted: boolean;
  shopId: number;
  shop?: Shop;
  rentals?: Rental[];
}

// Customer model
export interface Customer {
  customerId: number;
  name: string;
  surname: string;
  phone: string;
  address: string;
  email: string;
  governmentNo: string;
  drivingLicenseNo: string;
  createdAt?: string;
  isDeleted: boolean;
}

// Rental model
export interface Rental {
  rentalId: number;
  customerId: number;
  carId: number;
  shopId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  extraPrice?: number;
  notes?: string;
  status: RentalStatus;
  createdAt?: string;
  customer?: Customer;
  car?: Car;
  shop?: Shop;
}

// Shop model
export interface Shop {
  shopId: number;
  name: string;
  address: string;
  phoneNumber: string;
  email?: string;
  description?: string;
  workingHours?: WorkingHours[];
  cars?: Car[];
  ownerId: number;
  isEnabled: boolean;
}

// WorkingHours model
export interface WorkingHours {
  workingHoursId: number;
  shopId: number;
  dayOfWeek: DayOfWeek;
  isOpen: boolean;
  openingTime: TimeSpan;
  closingTime: TimeSpan;
  shop?: Shop;
}

// DayOfWeek enum
export enum DayOfWeek {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6
}

// TimeSpan interface
export interface TimeSpan {
  ticks: number;
  days?: number;
  hours?: number;
  milliseconds?: number;
  microseconds?: number;
  nanoseconds?: number;
  minutes?: number;
  seconds?: number;
  totalDays?: number;
  totalHours?: number;
  totalMilliseconds?: number;
  totalMicroseconds?: number;
  totalNanoseconds?: number;
  totalMinutes?: number;
  totalSeconds?: number;
}

// RentalStatus enum
export enum RentalStatus {
  Reserved = 0,
  Active = 1,
  Completed = 2,
  Cancelled = 3,
  Overdue = 4,
  Pending = 5
}

// Auth DTOs
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isDeleted?: boolean;
}

// Create DTOs
export interface CreateCarDto {
  brand: string;
  model: string;
  year: number;
  dailyPrice: number;
  licensePlate: string;
  color?: string;
  kilometer: number;
  transmissionType?: string;
  fuelType?: string;
  shopId: number;
  isAvailable?: boolean;
  isDeleted?: boolean;
}

export interface CreateCustomerDto {
  name: string;
  surname: string;
  phone: string;
  address: string;
  email: string;
  governmentNo: string;
  drivingLicenseNo: string;
  isDeleted?: boolean;
}

export interface CreateRentalDto {
  customerId: number;
  carId: number;
  shopId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  extraPrice?: number;
  notes?: string;
  status?: RentalStatus;
}

export interface CreateShopDto {
  name: string;
  address: string;
  phoneNumber: string;
  email?: string;
  description?: string;
  ownerId: number;
  isEnabled: boolean;
} 