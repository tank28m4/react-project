import { describe, it, expect, beforeEach } from 'vitest';
import cartReducer, { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  selectCartItems,
  selectCartCount,
  selectCartTotal
} from '../cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '../../index';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  [key: string]: any;
}

interface CartState {
  items: CartItem[];
  count: number;
}

describe('cartSlice', () => {
  let store: ReturnType<typeof configureStore>;
  
  beforeEach(() => {
    localStorage.clear();
    store = configureStore({
      reducer: {
        cart: cartReducer
      }
    });
  });

  it('should return the initial state', () => {
    const state = store.getState().cart as CartState;
    expect(state.items).toEqual([]);
    expect(state.count).toBe(0);
  });

  it('should handle adding an item to an empty cart', () => {
    const product = { id: '1', name: 'Test Product', price: 10 };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    
    const state = store.getState().cart as CartState;
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({ ...product, quantity: 2 });
    expect(state.count).toBe(2);
  });

  it('should handle adding an existing item to the cart', () => {
    const product = { id: '1', name: 'Test Product', price: 10 };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    store.dispatch(addToCart({ product, quantity: 3 }));
    
    const state = store.getState().cart as CartState;
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({ ...product, quantity: 5 });
    expect(state.count).toBe(5);
  });

  it('should handle removing an item from the cart', () => {
    const product1 = { id: '1', name: 'Test Product 1', price: 10 };
    const product2 = { id: '2', name: 'Test Product 2', price: 15 };
    
    store.dispatch(addToCart({ product: product1, quantity: 2 }));
    store.dispatch(addToCart({ product: product2, quantity: 1 }));
    store.dispatch(removeFromCart('1'));
    
    const state = store.getState().cart as CartState;
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('2');
    expect(state.count).toBe(1);
  });

  it('should handle updating quantity of an item in the cart', () => {
    const product = { id: '1', name: 'Test Product', price: 10 };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    store.dispatch(updateQuantity({ productId: '1', quantity: 5 }));
    
    const state = store.getState().cart as CartState;
    expect(state.items[0].quantity).toBe(5);
    expect(state.count).toBe(5);
  });

  it('should remove item when updating quantity to zero', () => {
    const product = { id: '1', name: 'Test Product', price: 10 };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    store.dispatch(updateQuantity({ productId: '1', quantity: 0 }));
    
    const state = store.getState().cart as CartState;
    expect(state.items).toHaveLength(0);
    expect(state.count).toBe(0);
  });

  it('should handle clearing the cart', () => {
    const product1 = { id: '1', name: 'Test Product 1', price: 10 };
    const product2 = { id: '2', name: 'Test Product 2', price: 15 };
    
    store.dispatch(addToCart({ product: product1, quantity: 2 }));
    store.dispatch(addToCart({ product: product2, quantity: 1 }));
    store.dispatch(clearCart());
    
    const state = store.getState().cart as CartState;
    expect(state.items).toHaveLength(0);
    expect(state.count).toBe(0);
  });

  it('should calculate the total price correctly', () => {
    const product1 = { id: '1', name: 'Test Product 1', price: 10 };
    const product2 = { id: '2', name: 'Test Product 2', price: 15 };
    
    store.dispatch(addToCart({ product: product1, quantity: 2 }));
    store.dispatch(addToCart({ product: product2, quantity: 1 }));
    
    const state = store.getState() as unknown as RootState;
    expect(selectCartTotal(state)).toBe('35.00');
  });

  it('should select cart items correctly', () => {
    const product = { id: '1', name: 'Test Product', price: 10 };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    
    const state = store.getState() as unknown as RootState;
    expect(selectCartItems(state)).toEqual([{ ...product, quantity: 2 }]);
  });

  it('should select cart count correctly', () => {
    const product1 = { id: '1', name: 'Test Product 1', price: 10 };
    const product2 = { id: '2', name: 'Test Product 2', price: 15 };
    
    store.dispatch(addToCart({ product: product1, quantity: 2 }));
    store.dispatch(addToCart({ product: product2, quantity: 3 }));
    
    const state = store.getState() as unknown as RootState;
    expect(selectCartCount(state)).toBe(5);
  });

  it('should update localStorage when adding an item to the cart', () => {
    const product = { id: '1', name: 'Test Product', price: 10 };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    
    const localStorageCart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(localStorageCart).toHaveLength(1);
    expect(localStorageCart[0]).toEqual({ ...product, quantity: 2 });
  });

  it('should update localStorage when removing an item from the cart', () => {
    const product1 = { id: '1', name: 'Test Product 1', price: 10 };
    const product2 = { id: '2', name: 'Test Product 2', price: 15 };
    
    store.dispatch(addToCart({ product: product1, quantity: 2 }));
    store.dispatch(addToCart({ product: product2, quantity: 1 }));
    store.dispatch(removeFromCart('1'));
    
    const localStorageCart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(localStorageCart).toHaveLength(1);
    expect(localStorageCart[0].id).toBe('2');
  });

  it('should update localStorage when clearing the cart', () => {
    const product = { id: '1', name: 'Test Product', price: 10 };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    store.dispatch(clearCart());
    
    const localStorageCart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(localStorageCart).toHaveLength(0);
  });
}); 