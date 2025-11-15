import { ApiClient } from '@/lib/data/repositories/client';
import { Supplier, SearchParams, PaginatedResponse } from '@/types';

export class SupplierRepository {
  constructor(private apiClient: ApiClient) {}

  async getAll(params?: SearchParams): Promise<PaginatedResponse<Supplier>> {
    const response = await this.apiClient.get<PaginatedResponse<Supplier>>(
      '/suppliers',
      {
        params: {
          page: params?.page || 1,
          limit: params?.limit || 20,
          search: params?.search,
          category: params?.category,
          verified: params?.verified,
          minRating: params?.minRating,
          maxDistance: params?.maxDistance,
        },
      }
    );
    return response;
  }

  async getById(id: string): Promise<Supplier> {
    const response = await this.apiClient.get<Supplier>(`/suppliers/${id}`);
    return response;
  }

  async getProducts(
    supplierId: string,
    params?: SearchParams
  ): Promise<PaginatedResponse<any>> {
    const response = await this.apiClient.get<PaginatedResponse<any>>(
      `/suppliers/${supplierId}/products`,
      {
        params: {
          page: params?.page || 1,
          limit: params?.limit || 20,
          search: params?.search,
          category: params?.category,
        },
      }
    );
    return response;
  }

  async updateProfile(id: string, data: Partial<Supplier>): Promise<Supplier> {
    const response = await this.apiClient.put<Supplier>(
      `/suppliers/${id}`,
      data
    );
    return response;
  }

  async delete(id: string): Promise<void> {
    await this.apiClient.delete(`/suppliers/${id}`);
  }
}
