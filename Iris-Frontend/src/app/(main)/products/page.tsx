'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Search, Filter, Plus } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Products</h1>
          <p className='text-muted-foreground'>
            Manage your product catalog and inventory
          </p>
        </div>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>
            Find products by name, category, or supplier
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input placeholder='Search products...' className='pl-10' />
              </div>
            </div>
            <Button variant='outline'>
              <Filter className='mr-2 h-4 w-4' />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Product {i}</CardTitle>
              <CardDescription>Fresh organic produce</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-sm text-muted-foreground'>Price:</span>
                  <span className='font-medium'>$12.99</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-muted-foreground'>Stock:</span>
                  <span className='font-medium'>24 units</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Supplier:
                  </span>
                  <span className='font-medium'>Fresh Farms</span>
                </div>
              </div>
              <div className='mt-4 flex gap-2'>
                <Button size='sm' className='flex-1'>
                  Edit
                </Button>
                <Button size='sm' variant='outline'>
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
