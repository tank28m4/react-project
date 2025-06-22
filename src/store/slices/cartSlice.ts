import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  [key: string]: any;
}

interface AddToCartPayload {
  product: Omit<CartItem, 'quantity'> & { id: string | number; price: number };
  quantity?: number;
}

interface UpdateQuantityPayload {
  productId: string | number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  count: number;
}

const getInitialCartItems = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialState: CartState = {
  items: getInitialCartItems(),
  count: getInitialCartItems().reduce((total, item) => total + item.quantity, 0)
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push({ ...product, quantity } as CartItem);
      }
      
      state.count = state.items.reduce((total, item) => total + item.quantity, 0);
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.count = state.items.reduce((total, item) => total + item.quantity, 0);
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== productId);
      } else {
        const itemIndex = state.items.findIndex(item => item.id === productId);
        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = quantity;
        }
      }
      
      state.count = state.items.reduce((total, item) => total + item.quantity, 0);
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    
    clearCart: (state) => {
      state.items = [];
      state.count = 0;
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) => state.cart.count;
export const selectCartTotal = (state: RootState) => 
  state.cart.items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0).toFixed(2);

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 