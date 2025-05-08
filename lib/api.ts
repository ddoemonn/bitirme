import { Car, Customer, Rental, Shop, RentalStatus } from './types';

const API_BASE_URL = 'https://carrentalmp-app.azurewebsites.net';

// Authentication services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  },

  register: async (firstName: string, lastName: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/Auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return true;
  },

  getUserInfo: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Auth/userinfo`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    return await response.json();
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

// Cars service
export const carsService = {
  getAllCars: async (): Promise<Car[]> => {
    const response = await fetch(`${API_BASE_URL}/api/Cars`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }

    return await response.json();
  },

  getCarById: async (id: number): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/api/Cars/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch car with id ${id}`);
    }

    return await response.json();
  },

  createCar: async (car: { brand: string, model: string, year: number, dailyPrice: number, licensePlate: string, color?: string, kilometer: number, transmissionType?: string, fuelType?: string, shopId: number, isAvailable: boolean, isDeleted: boolean }): Promise<Car> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(car),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create car');
    }

    return await response.json();
  },

  deleteCar: async (id: number): Promise<boolean> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Cars/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete car with id ${id}`);
    }

    return true;
  }
};

// Customers service
export const customersService = {
  getAllCustomers: async (): Promise<Customer[]> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Customers`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }

    return await response.json();
  },

  getCustomerById: async (id: number): Promise<Customer> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Customers/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch customer with id ${id}`);
    }

    return await response.json();
  },

  createCustomer: async (customer: { name: string, surname: string, phone: string, address: string, email: string, governmentNo: string, drivingLicenseNo: string, isDeleted: boolean }): Promise<Customer> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(customer),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create customer');
    }

    return await response.json();
  },

  updateCustomer: async (id: number, customer: { name: string, surname: string, phone: string, address: string, email: string, governmentNo: string, drivingLicenseNo: string, isDeleted: boolean }): Promise<Customer> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(customer),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update customer with id ${id}`);
    }

    return await response.json();
  },

  deleteCustomer: async (id: number): Promise<boolean> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Customers/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete customer with id ${id}`);
    }

    return true;
  }
};

// Rentals service
export const rentalsService = {
  getAllRentals: async (): Promise<Rental[]> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Rentals`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch rentals');
    }

    return await response.json();
  },

  getRentalById: async (id: number): Promise<Rental> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Rentals/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch rental with id ${id}`);
    }

    return await response.json();
  },

  getRentalsByCustomer: async (customerId: number): Promise<Rental[]> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Rentals/customer/${customerId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch rentals for customer with id ${customerId}`);
    }

    return await response.json();
  },

  createRental: async (rental: Omit<Rental, 'rentalId'>): Promise<Rental> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Rentals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(rental),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create rental');
    }

    return await response.json();
  },

  updateRentalStatus: async (id: number, status: RentalStatus): Promise<boolean> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Rentals/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(status),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update status for rental with id ${id}`);
    }

    return true;
  },

  deleteRental: async (id: number): Promise<boolean> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Rentals/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete rental with id ${id}`);
    }

    return true;
  }
};

// Shops service
export const shopsService = {
  getAllShops: async (): Promise<Shop[]> => {
    const response = await fetch(`${API_BASE_URL}/api/Shops`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch shops');
    }

    return await response.json();
  },

  getShopById: async (id: number): Promise<Shop> => {
    const response = await fetch(`${API_BASE_URL}/api/Shops/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch shop with id ${id}`);
    }

    return await response.json();
  },

  createShop: async (shop: Omit<Shop, 'shopId'>): Promise<Shop> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Shops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(shop),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create shop');
    }

    return await response.json();
  },

  updateShop: async (id: number, shop: Shop): Promise<boolean> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Shops/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(shop),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update shop with id ${id}`);
    }

    return true;
  },

  deleteShop: async (id: number): Promise<boolean> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/Shops/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete shop with id ${id}`);
    }

    return true;
  }
}; 