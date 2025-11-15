// Table component props

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => unknown;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}
