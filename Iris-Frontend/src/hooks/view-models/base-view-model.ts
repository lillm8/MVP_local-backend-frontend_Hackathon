// Base ViewModel class
// Common functionality for all ViewModels

import {
  useAsyncState,
  usePagination,
  useFilters,
  AsyncState,
} from 'lib/utils/state-management';

export abstract class BaseViewModel<T> {
  protected asyncState: AsyncState<T> & ReturnType<typeof useAsyncState<T>>;
  protected pagination: ReturnType<typeof usePagination>;
  protected filters: ReturnType<typeof useFilters<any>>;

  constructor() {
    this.asyncState = useAsyncState<T>();
    this.pagination = usePagination();
    this.filters = useFilters({});
  }

  /**
   * Get current state
   */
  get state() {
    return {
      data: this.asyncState.data,
      loading: this.asyncState.loading,
      error: this.asyncState.error,
      hasError: this.asyncState.hasError,
      pagination: {
        page: this.pagination.page,
        limit: this.pagination.limit,
        total: this.pagination.total,
        hasNextPage: this.pagination.hasNextPage,
        hasPreviousPage: this.pagination.hasPreviousPage,
      },
      filters: this.filters.filters,
      hasActiveFilters: this.filters.hasActiveFilters,
    };
  }

  /**
   * Reset all state
   */
  reset(): void {
    this.asyncState.reset();
    this.pagination.reset();
    this.filters.clearFilters();
  }

  /**
   * Set loading state
   */
  setLoading(loading: boolean): void {
    this.asyncState.setLoading(loading);
  }

  /**
   * Set error state
   */
  setError(error: Error | null): void {
    this.asyncState.setError(error);
  }

  /**
   * Set data
   */
  setData(data: T | null): void {
    this.asyncState.setData(data);
  }

  /**
   * Execute async operation
   */
  protected async executeAsync<R>(
    operation: () => Promise<R>,
    onSuccess?: (result: R) => void,
    onError?: (error: Error) => void
  ): Promise<R | null> {
    try {
      this.setLoading(true);
      this.setError(null);

      const result = await operation();

      if (onSuccess) {
        onSuccess(result);
      }

      this.setLoading(false);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      this.setError(err);

      if (onError) {
        onError(err);
      }

      this.setLoading(false);
      return null;
    }
  }

  /**
   * Abstract method for loading data
   * Must be implemented by subclasses
   */
  abstract loadData(): Promise<void>;

  /**
   * Abstract method for refreshing data
   * Must be implemented by subclasses
   */
  abstract refresh(): Promise<void>;
}
