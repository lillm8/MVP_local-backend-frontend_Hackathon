import { RestaurantProfileView as ComposedRestaurantProfileView } from './restaurant-profile/RestaurantProfileView';
export type { RestaurantProfileViewProps } from './restaurant-profile/RestaurantProfileView';

export function RestaurantProfileView(
  props: React.ComponentProps<typeof ComposedRestaurantProfileView>
) {
  return <ComposedRestaurantProfileView {...props} />;
}
