// Order API types (Infrastructure contracts)

export interface CreateOrderRequest {
  supplierId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  deliveryDate: string;
  deliveryTime: string;
  notes?: string;
}

export interface UpdateOrderRequest {
  status?: string;
  notes?: string;
}

