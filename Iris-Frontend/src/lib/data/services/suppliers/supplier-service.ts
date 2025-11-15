import { Supplier, SearchParams, PaginatedResponse } from '@/types';
import { SupplierRepository } from '../../repositories/suppliers/supplier-repository';

export class SupplierService {
  constructor(private supplierRepository: SupplierRepository) {}

  async getSuppliers(
    params?: SearchParams
  ): Promise<PaginatedResponse<Supplier>> {
    try {
      return await this.supplierRepository.getAll(params);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      throw new Error('Failed to fetch suppliers');
    }
  }

  async getSupplierById(id: string): Promise<Supplier> {
    try {
      return await this.supplierRepository.getById(id);
    } catch (error) {
      console.error('Error fetching supplier:', error);
      throw new Error(`Failed to fetch supplier with id ${id}`);
    }
  }

  async getSupplierProducts(
    supplierId: string,
    params?: SearchParams
  ): Promise<PaginatedResponse<any>> {
    try {
      return await this.supplierRepository.getProducts(supplierId, params);
    } catch (error) {
      console.error('Error fetching supplier products:', error);
      throw new Error('Failed to fetch supplier products');
    }
  }

  async updateSupplierProfile(
    id: string,
    data: Partial<Supplier>
  ): Promise<Supplier> {
    try {
      // Validate required fields
      if (data.name && data.name.trim().length === 0) {
        throw new Error('Supplier name cannot be empty');
      }

      if (data.email && !this.isValidEmail(data.email)) {
        throw new Error('Invalid email format');
      }

      return await this.supplierRepository.updateProfile(id, data);
    } catch (error) {
      console.error('Error updating supplier:', error);
      throw error instanceof Error
        ? error
        : new Error('Failed to update supplier profile');
    }
  }

  async deleteSupplier(id: string): Promise<void> {
    try {
      await this.supplierRepository.delete(id);
    } catch (error) {
      console.error('Error deleting supplier:', error);
      throw new Error('Failed to delete supplier');
    }
  }

  // Business logic methods
  filterSuppliersByDistance(
    suppliers: Supplier[],
    userLocation: { lat: number; lng: number },
    maxDistance: number
  ): Supplier[] {
    return suppliers.filter(supplier => {
      // Mock distance calculation - in real app would use proper geolocation
      if (!supplier.address.coordinates) return false;
      const distance = this.calculateDistance(
        userLocation,
        supplier.address.coordinates
      );
      return distance <= maxDistance;
    });
  }

  sortSuppliersByRating(
    suppliers: Supplier[],
    ascending: boolean = false
  ): Supplier[] {
    return [...suppliers].sort((a, b) => {
      return ascending ? a.rating - b.rating : b.rating - a.rating;
    });
  }

  getVerifiedSuppliers(suppliers: Supplier[]): Supplier[] {
    return suppliers.filter(supplier => supplier.isVerified);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private calculateDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number {
    // Mock distance calculation - in real app would use Haversine formula
    const latDiff = point1.lat - point2.lat;
    const lngDiff = point1.lng - point2.lng;
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111; // Rough conversion to km
  }
}
