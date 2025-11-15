import { ApiClient } from '@/lib/data/repositories/client';
import { Order, SearchParams, PaginatedResponse } from '@/types';
import { CreateOrderRequest } from '@/lib/data/types';

export class OrderRepository {
  constructor(private apiClient: ApiClient) {}

  async getAll(params?: SearchParams): Promise<PaginatedResponse<Order>> {
    const response = await this.apiClient.get<PaginatedResponse<Order>>(
      '/orders',
      {
        params: {
          page: params?.page || 1,
          limit: params?.limit || 20,
          search: params?.search,
          status: params?.status,
          supplierId: params?.supplierId,
          customerId: params?.customerId,
          startDate: params?.startDate,
          endDate: params?.endDate,
        },
      }
    );
    return response;
  }

  async getById(id: string): Promise<Order> {
    const response = await this.apiClient.get<Order>(`/orders/${id}`);
    return response;
  }

  async create(data: CreateOrderRequest): Promise<Order> {
    const response = await this.apiClient.post<Order>('/orders', data);
    return response;
  }

  async updateStatus(id: string, status: Order['status']): Promise<Order> {
    const response = await this.apiClient.patch<Order>(`/orders/${id}/status`, {
      status,
    });
    return response;
  }

  async update(id: string, data: Partial<Order>): Promise<Order> {
    const response = await this.apiClient.put<Order>(`/orders/${id}`, data);
    return response;
  }

  async delete(id: string): Promise<void> {
    await this.apiClient.delete(`/orders/${id}`);
  }

  async getBySupplier(
    supplierId: string,
    params?: SearchParams
  ): Promise<PaginatedResponse<Order>> {
    const response = await this.apiClient.get<PaginatedResponse<Order>>(
      `/suppliers/${supplierId}/orders`,
      {
        params: {
          page: params?.page || 1,
          limit: params?.limit || 20,
          status: params?.status,
          startDate: params?.startDate,
          endDate: params?.endDate,
        },
      }
    );
    return response;
  }

  async getByCustomer(
    customerId: string,
    params?: SearchParams
  ): Promise<PaginatedResponse<Order>> {
    const response = await this.apiClient.get<PaginatedResponse<Order>>(
      `/customers/${customerId}/orders`,
      {
        params: {
          page: params?.page || 1,
          limit: params?.limit || 20,
          status: params?.status,
          startDate: params?.startDate,
          endDate: params?.endDate,
        },
      }
    );
    return response;
  }
}
