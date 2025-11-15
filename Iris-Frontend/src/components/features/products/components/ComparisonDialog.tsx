import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Label } from '@components/ui/label';
import { Switch } from '@components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import {
  ArrowLeftRight,
  Info,
  MapPin,
  Star,
  Truck,
  BadgeCheck,
} from 'lucide-react';
import type { SimilarProductItem } from '@hooks/products/use-product-page';

interface ComparisonDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  highlightBest: boolean;
  onToggleHighlight: (v: boolean) => void;
  items: SimilarProductItem[];
  onAddToCart: () => void;
}

export function ComparisonDialog({
  open,
  onOpenChange,
  highlightBest,
  onToggleHighlight,
  items,
  onAddToCart,
}: ComparisonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] max-w-6xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-2xl text-primary'>
            <ArrowLeftRight className='h-6 w-6' />
            Compare Similar Products
          </DialogTitle>
        </DialogHeader>

        <div className='items.center mb-6 flex justify-center gap-3 rounded-xl bg-primary/5 p-4'>
          <Switch
            id='highlight-mode-dialog'
            checked={highlightBest}
            onCheckedChange={onToggleHighlight}
          />
          <Label htmlFor='highlight-mode-dialog' className='cursor-pointer'>
            Highlight Best Value
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className='h-4 w-4 text-muted-foreground' />
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark the best price, rating, and delivery time</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          {items.map(item => (
            <div
              key={item.id}
              className='duration-250 overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
            >
              <div className='relative aspect-[4/3] overflow-hidden'>
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className='h-full w-full object-cover'
                />
                {item.verified && (
                  <div className='absolute right-3 top-3 rounded-full bg-white/95 p-1.5 backdrop-blur-sm'>
                    <BadgeCheck className='h-4 w-4 text-primary' />
                  </div>
                )}
              </div>

              <div className='p-5'>
                <div className='mb-4'>
                  <h4 className='mb-1'>{item.name}</h4>
                  <p className='text-sm text-muted-foreground'>
                    {item.producer}
                  </p>
                  <div className='mt-2 flex items-center gap-1 text-xs text-muted-foreground'>
                    <MapPin className='h-3 w-3' />
                    <span>{item.location}</span>
                  </div>
                </div>

                <div
                  className={`duration-250 mb-3 rounded-xl p-3 transition-all ${highlightBest && item.isBestRating ? 'bg-primary/10 ring-2 ring-primary' : 'bg-muted/30'}`}
                >
                  <div className='mb-1 text-xs text-muted-foreground'>
                    Average Rating
                  </div>
                  <div className='flex items-center gap-2'>
                    <Star className='h-4 w-4 fill-accent text-accent' />
                    <span>{item.rating}</span>
                    <span className='text-xs text-muted-foreground'>
                      ({item.reviews})
                    </span>
                  </div>
                </div>

                <div
                  className={`duration-250 mb-3 rounded-xl p-3 transition-all ${highlightBest && item.isBestPrice ? 'bg-primary/10 ring-2 ring-primary' : 'bg-muted/30'}`}
                >
                  <div className='mb-1 text-xs text-muted-foreground'>
                    Price per Unit
                  </div>
                  <div className='text-xl text-primary'>
                    €{item.priceValue.toFixed(2)}
                    <span className='text-sm text-muted-foreground'>/kg</span>
                  </div>
                </div>

                <div
                  className={`duration-250 mb-3 rounded-xl p-3 transition-all ${highlightBest && item.isBestDelivery ? 'bg-primary/10 ring-2 ring-primary' : 'bg-muted/30'}`}
                >
                  <div className='mb-1 text-xs text-muted-foreground'>
                    Delivery Time
                  </div>
                  <div className='flex items-center gap-2'>
                    <Truck className='h-4 w-4 text-accent' />
                    <span className='text-sm'>{item.deliveryTime}</span>
                  </div>
                </div>

                <div className='mb-3 rounded-xl bg-muted/30 p-3'>
                  <div className='mb-1 text-xs text-muted-foreground'>
                    Stock Status
                  </div>
                  <Badge
                    variant={
                      item.stockAvailable === 'In Stock'
                        ? 'default'
                        : 'secondary'
                    }
                    className='text-xs'
                  >
                    {item.stockAvailable}
                  </Badge>
                </div>

                <div className='mb-4 rounded-xl bg-muted/30 p-3'>
                  <div className='mb-2 text-xs text-muted-foreground'>
                    Certifications
                  </div>
                  <div className='flex flex-wrap gap-1.5'>
                    {item.badges.map((b, i) => (
                      <Badge key={i} variant='outline' className='text-xs'>
                        {b}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className='space-y-2'>
                  <Button
                    onClick={onAddToCart}
                    className='duration-250 w-full rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90'
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant='outline'
                    className='duration-250 w-full rounded-xl text-xs transition-all hover:bg-accent/10'
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center'>
          <p className='text-sm text-muted-foreground'>
            Compare pricing, ratings, delivery times, and certifications to make
            the best choice for your needs.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
