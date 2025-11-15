'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/types';

/**
 * CartItem represents a simplified version of Product for cart functionality.
 * It includes only the essential fields needed for cart operations:
 * - Basic product info (id, name, price, unit)
 * - Cart-specific data (quantity)
 * - Supplier info for grouping and display
 * - Optional image for UI display
 *
 * This separation allows the cart to be lightweight while still maintaining
 * the relationship to the full Product entity.
 */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  supplierId: string;
  supplierName: string;
  image?: string;
  unit?: string;
}

/**
 * Helper function to create a CartItem from a Product
 */
export const createCartItemFromProduct = (
  product: Product
): Omit<CartItem, 'quantity'> => ({
  id: product.id,
  name: product.name,
  price: product.price,
  supplierId: product.supplierId,
  supplierName: product.supplierName,
  image: product.image,
  unit: product.unit,
});

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ITEMS'; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      }

      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      return {
        ...state,
        items: newItems,
        total: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, {
          type: 'REMOVE_ITEM',
          payload: action.payload.id,
        });
      }

      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'SET_ITEMS': {
      return {
        ...state,
        items: action.payload,
        total: action.payload.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        itemCount: action.payload.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setItems = (items: CartItem[]) => {
    dispatch({ type: 'SET_ITEMS', payload: items });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
