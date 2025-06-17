// src/types.ts
export interface Order {
  id: string;
  customerName: string;
  user?: {
    name: string;
    address?: string;
  };
  restaurant: {
    name: string;
    address: string;
  };
  address?: string;
  status: string;
  items?: string[];
  total?: number;
  createdAt?: string;
  estimatedDeliveryTime?: string;
  details?: string;
  units?: number;
}

export type OrderStatus = 'pending' | 'accepted' | 'completed' | 'in-progress' | 'delivered';
