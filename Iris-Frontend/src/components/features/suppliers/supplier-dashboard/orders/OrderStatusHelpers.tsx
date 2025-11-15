import { Clock, Truck, CheckCircle, XCircle, Package } from 'lucide-react';

export function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case 'processing':
      return <Clock className='h-4 w-4' />;
    case 'shipped':
      return <Truck className='h-4 w-4' />;
    case 'delivered':
      return <CheckCircle className='h-4 w-4' />;
    case 'cancelled':
      return <XCircle className='h-4 w-4' />;
    default:
      return <Package className='h-4 w-4' />;
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
