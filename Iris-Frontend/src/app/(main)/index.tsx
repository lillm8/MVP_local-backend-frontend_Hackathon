'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Welcome to your Iris marketplace dashboard
        </p>
      </div>

      {/* Quick Stats */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Orders</CardTitle>
            <ShoppingCart className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2,350</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Products</CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,234</div>
            <p className='text-xs text-muted-foreground'>
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Suppliers</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>89</div>
            <p className='text-xs text-muted-foreground'>
              +3.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Revenue</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$45,231</div>
            <p className='text-xs text-muted-foreground'>
              +15.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest marketplace orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Order #1234</span>
                <span className='text-sm text-muted-foreground'>$125.00</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Order #1235</span>
                <span className='text-sm text-muted-foreground'>$89.50</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Order #1236</span>
                <span className='text-sm text-muted-foreground'>$234.75</span>
              </div>
            </div>
            <Button className='mt-4 w-full' variant='outline'>
              View All Orders
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Suppliers</CardTitle>
            <CardDescription>Your most trusted suppliers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Fresh Farms Co.</span>
                <span className='text-sm text-muted-foreground'>4.9★</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Organic Valley</span>
                <span className='text-sm text-muted-foreground'>4.8★</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Local Harvest</span>
                <span className='text-sm text-muted-foreground'>4.7★</span>
              </div>
            </div>
            <Button className='mt-4 w-full' variant='outline'>
              Browse Suppliers
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Button className='w-full' variant='default'>
              Create New Order
            </Button>
            <Button className='w-full' variant='outline'>
              Browse Products
            </Button>
            <Button className='w-full' variant='outline'>
              Manage Suppliers
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
