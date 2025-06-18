import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return calculateCartTotals(updatedItems);
      } else {
        const updatedItems = [...state.items, { product: action.payload, quantity: 1 }];
        return calculateCartTotals(updatedItems);
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.product.id !== action.payload);
      return calculateCartTotals(updatedItems);
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.product.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      return calculateCartTotals(updatedItems);
    }
    
    case 'CLEAR_CART': {
      return { items: [], total: 0, itemCount: 0 };
    }
    
    case 'LOAD_CART': {
      return calculateCartTotals(action.payload);
    }
    
    default:
      return state;
  }
};

const calculateCartTotals = (items: CartItem[]): CartState => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return { items, total, itemCount };
};

interface CartContextType extends CartState {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 });

  useEffect(() => {
    dispatch({ type: 'LOAD_CART', payload: cartItems });
  }, [cartItems]);

  useEffect(() => {
    setCartItems(state.items);
  }, [state.items, setCartItems]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
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