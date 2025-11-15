import { Heart, Store, ShoppingBag, Receipt } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useFavoritesPage } from '@hooks/user/use-favorites-page';
import { FavoriteSupplierCard } from './components/favorites/FavoriteSupplierCard';
import { FavoriteProductCard } from './components/favorites/FavoriteProductCard';
import { FavoriteOrderCard } from './components/favorites/FavoriteOrderCard';

interface FavoritesPageProps {
  onNavigateToProduct: () => void;
  onViewSupplier?: (supplierId: string) => void;
}

export function FavoritesPage({
  onNavigateToProduct,
  onViewSupplier,
}: FavoritesPageProps) {
  const {
    favoriteSuppliers,
    removeFavoriteSupplier,
    favoriteProducts,
    removeFavoriteProduct,
    favoriteOrders,
    removeFavoriteOrder,
  } = useFavoritesPage();

  return (
    <div className='min-h-screen py-12'>
      <div className='mx-auto max-w-[1440px] px-8'>
        <div className='mb-8'>
          <div className='mb-3 flex items-center gap-3'>
            <Heart className='h-8 w-8 fill-accent text-accent' />
            <h1 className='text-4xl text-primary'>Favorites</h1>
          </div>
          <p className='text-lg text-muted-foreground'>
            Quick access to your favorite suppliers, products, and recurring
            orders
          </p>
        </div>

        <Tabs defaultValue='suppliers' className='w-full'>
          <TabsList className='mb-8 rounded-xl bg-white p-1 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
            <TabsTrigger value='suppliers' className='rounded-lg'>
              <Store className='mr-2 h-4 w-4' />
              Suppliers ({favoriteSuppliers.length})
            </TabsTrigger>
            <TabsTrigger value='products' className='rounded-lg'>
              <ShoppingBag className='mr-2 h-4 w-4' />
              Products ({favoriteProducts.length})
            </TabsTrigger>
            <TabsTrigger value='orders' className='rounded-lg'>
              <Receipt className='mr-2 h-4 w-4' />
              Orders ({favoriteOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value='suppliers' className='mt-0'>
            {favoriteSuppliers.length === 0 ? (
              <div className='flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 p-12 text-center'>
                <Store className='mb-4 h-16 w-16 text-muted-foreground/30' />
                <h3 className='mb-2 text-xl text-primary'>
                  No favorite suppliers yet
                </h3>
                <p className='max-w-md text-muted-foreground'>
                  Start exploring the marketplace and save your favorite
                  suppliers for quick access
                </p>
              </div>
            ) : (
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {favoriteSuppliers.map(s => (
                  <FavoriteSupplierCard
                    key={s.id}
                    {...s}
                    onVisit={id => onViewSupplier?.(id.toString())}
                    onRemove={removeFavoriteSupplier}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value='products' className='mt-0'>
            {favoriteProducts.length === 0 ? (
              <div className='flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 p-12 text-center'>
                <ShoppingBag className='mb-4 h-16 w-16 text-muted-foreground/30' />
                <h3 className='mb-2 text-xl text-primary'>
                  No favorite products yet
                </h3>
                <p className='max-w-md text-muted-foreground'>
                  Browse products and save your favorites for quick reordering
                </p>
              </div>
            ) : (
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                {favoriteProducts.map(p => (
                  <FavoriteProductCard
                    key={p.id}
                    {...p}
                    onAdd={onNavigateToProduct}
                    onViewSupplier={id => onViewSupplier?.(id.toString())}
                    onRemove={removeFavoriteProduct}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value='orders' className='mt-0'>
            {favoriteOrders.length === 0 ? (
              <div className='bg-gradient.to-br flex min-h-[400px] flex-col items-center justify-center rounded-3xl from-primary/5 to-accent/5 p-12 text-center'>
                <Receipt className='mb-4 h-16 w-16 text-muted-foreground/30' />
                <h3 className='mb-2 text-xl text-primary'>
                  No favorite orders yet
                </h3>
                <p className='max-w-md text-muted-foreground'>
                  Save frequently repeated orders for quick one-click reordering
                </p>
              </div>
            ) : (
              <div className='space-y-4'>
                {favoriteOrders.map(o => (
                  <FavoriteOrderCard
                    key={o.id}
                    {...o}
                    onRemove={removeFavoriteOrder}
                    onViewSupplier={id => onViewSupplier?.(id.toString())}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {(favoriteSuppliers.length > 0 ||
          favoriteProducts.length > 0 ||
          favoriteOrders.length > 0) && (
          <div className='mt-12 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center'>
            <h3 className='mb-3 text-xl text-primary'>
              Build lasting partnerships
            </h3>
            <p className='mx-auto max-w-2xl text-muted-foreground'>
              Favoriting suppliers, products, and orders helps you maintain
              consistent quality and streamline your ordering process. Your
              favorites are always just a click away.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
