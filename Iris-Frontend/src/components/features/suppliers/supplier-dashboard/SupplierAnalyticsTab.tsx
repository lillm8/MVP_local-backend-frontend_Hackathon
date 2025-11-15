// Analytics tab component for supplier dashboard

import { Card } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
} from 'lucide-react';

interface SupplierAnalyticsTabProps {
  // Analytics data would be passed as props
}

export function SupplierAnalyticsTab({}: SupplierAnalyticsTabProps) {
  // Mock analytics data
  const revenueData = [
    { month: 'Jan', revenue: 8500, orders: 45 },
    { month: 'Feb', revenue: 9200, orders: 52 },
    { month: 'Mar', revenue: 10800, orders: 61 },
    { month: 'Apr', revenue: 12450, orders: 68 },
    { month: 'May', revenue: 11200, orders: 58 },
    { month: 'Jun', revenue: 13400, orders: 72 },
  ];

  const topProducts = [
    { name: 'Heirloom Tomatoes', sales: 245, revenue: '€1,102.50' },
    { name: 'Organic Carrots', sales: 189, revenue: '€604.80' },
    { name: 'Fresh Lettuce', sales: 134, revenue: '€375.20' },
    { name: 'Organic Spinach', sales: 98, revenue: '€343.00' },
  ];

  const topCustomers = [
    { name: 'Bella Vista Restaurant', orders: 24, total: '€2,340.50' },
    { name: 'The Garden Bistro', orders: 31, total: '€3,120.80' },
    { name: 'Café Moderno', orders: 18, total: '€1,890.20' },
  ];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>Analytics & Reports</h2>
          <p className='text-muted-foreground'>
            Track your performance and business metrics
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Select defaultValue='6months'>
            <SelectTrigger className='w-40'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1month'>Last Month</SelectItem>
              <SelectItem value='3months'>Last 3 Months</SelectItem>
              <SelectItem value='6months'>Last 6 Months</SelectItem>
              <SelectItem value='1year'>Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                Total Revenue
              </p>
              <p className='text-2xl font-bold'>€65,550</p>
              <div className='mt-2 flex items-center'>
                <TrendingUp className='mr-1 h-4 w-4 text-green-500' />
                <span className='text-sm text-green-600'>
                  +15.2% from last period
                </span>
              </div>
            </div>
            <DollarSign className='h-8 w-8 text-primary' />
          </div>
        </Card>

        <Card className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                Total Orders
              </p>
              <p className='text-2xl font-bold'>356</p>
              <div className='mt-2 flex items-center'>
                <TrendingUp className='mr-1 h-4 w-4 text-green-500' />
                <span className='text-sm text-green-600'>
                  +8.3% from last period
                </span>
              </div>
            </div>
            <ShoppingCart className='h-8 w-8 text-primary' />
          </div>
        </Card>

        <Card className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                Active Customers
              </p>
              <p className='text-2xl font-bold'>89</p>
              <div className='mt-2 flex items-center'>
                <TrendingUp className='mr-1 h-4 w-4 text-green-500' />
                <span className='text-sm text-green-600'>
                  +12.5% from last period
                </span>
              </div>
            </div>
            <Users className='h-8 w-8 text-primary' />
          </div>
        </Card>

        <Card className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                Avg Order Value
              </p>
              <p className='text-2xl font-bold'>€184.13</p>
              <div className='mt-2 flex items-center'>
                <TrendingDown className='mr-1 h-4 w-4 text-red-500' />
                <span className='text-sm text-red-600'>
                  -2.1% from last period
                </span>
              </div>
            </div>
            <BarChart3 className='h-8 w-8 text-primary' />
          </div>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className='p-6'>
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='text-lg font-semibold'>Revenue Trend</h3>
          <div className='flex items-center space-x-2'>
            <Badge variant='outline'>6 months</Badge>
            <Button variant='outline' size='sm'>
              <Calendar className='mr-2 h-4 w-4' />
              Custom Range
            </Button>
          </div>
        </div>
        <div className='flex h-64 items-center justify-center rounded-lg bg-muted/20'>
          <div className='text-center'>
            <BarChart3 className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
            <p className='text-muted-foreground'>
              Revenue chart would be displayed here
            </p>
            <p className='text-sm text-muted-foreground'>
              Integration with charting library needed
            </p>
          </div>
        </div>
      </Card>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Top Products */}
        <Card className='p-6'>
          <h3 className='mb-4 text-lg font-semibold'>
            Top Performing Products
          </h3>
          <div className='space-y-4'>
            {topProducts.map((product, index) => (
              <div key={index} className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10'>
                    <Package className='h-4 w-4 text-primary' />
                  </div>
                  <div>
                    <p className='font-medium'>{product.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {product.sales} units sold
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-semibold'>{product.revenue}</p>
                  <p className='text-sm text-muted-foreground'>Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Customers */}
        <Card className='p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Top Customers</h3>
          <div className='space-y-4'>
            {topCustomers.map((customer, index) => (
              <div key={index} className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10'>
                    <Users className='h-4 w-4 text-primary' />
                  </div>
                  <div>
                    <p className='font-medium'>{customer.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {customer.orders} orders
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-semibold'>{customer.total}</p>
                  <p className='text-sm text-muted-foreground'>Total spent</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className='p-6'>
        <h3 className='mb-4 text-lg font-semibold'>Performance Insights</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='text-center'>
            <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100'>
              <TrendingUp className='h-6 w-6 text-green-600' />
            </div>
            <h4 className='mb-2 font-semibold'>Revenue Growth</h4>
            <p className='text-sm text-muted-foreground'>
              Your revenue has grown by 15.2% compared to the previous period,
              indicating strong business performance.
            </p>
          </div>
          <div className='text-center'>
            <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100'>
              <Users className='h-6 w-6 text-blue-600' />
            </div>
            <h4 className='mb-2 font-semibold'>Customer Acquisition</h4>
            <p className='text-sm text-muted-foreground'>
              You've gained 12 new customers this period, expanding your market
              reach and building a stronger customer base.
            </p>
          </div>
          <div className='text-center'>
            <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100'>
              <Package className='h-6 w-6 text-yellow-600' />
            </div>
            <h4 className='mb-2 font-semibold'>Product Performance</h4>
            <p className='text-sm text-muted-foreground'>
              Heirloom Tomatoes are your top performer. Consider expanding
              similar high-demand products.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
