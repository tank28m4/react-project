import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import Menu from '../Menu';
import cartReducer from '../../store/slices/cartSlice';
import authReducer from '../../store/slices/authSlice';
import orderReducer from '../../store/slices/orderSlice';
import { selectCartItems } from '../../store/slices/cartSlice';

vi.mock('../../hooks/useFetch', () => ({
  default: () => ({
    fetch: vi.fn().mockResolvedValue({
      data: [
        {
          id: '1',
          meal: 'Test Burger',
          price: 12.99,
          category: 'Dessert',
          area: 'American',
          img: 'test-image.jpg'
        },
        {
          id: '2',
          meal: 'Test Pizza',
          price: 15.99,
          category: 'Dinner',
          area: 'Italian',
          img: 'test-image.jpg'
        }
      ]
    })
  })
}));

describe('Menu Component', () => {
  let store: ReturnType<typeof configureStore>;
  
  beforeEach(() => {
    localStorage.clear();
    store = configureStore({
      reducer: {
        cart: cartReducer,
        auth: authReducer,
        order: orderReducer
      }
    });
    
    vi.clearAllMocks();
  });
  
  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </Provider>
    );
  };
  
  it('should render menu items from API', async () => {
    renderWithProviders(<Menu />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Burger')).toBeInTheDocument();
    });
  });
  
  it('should filter menu items by category', async () => {
    renderWithProviders(<Menu />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Burger')).toBeInTheDocument();
    });
    
    const dinnerTab = screen.getByText('Dinner');
    fireEvent.click(dinnerTab);
    
    await waitFor(() => {
      expect(screen.queryByText('Test Burger')).not.toBeInTheDocument();
      expect(screen.getByText('Test Pizza')).toBeInTheDocument();
    });
  });
  
  it('should add item to cart when "Add to Cart" button is clicked', async () => {
    renderWithProviders(<Menu />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Burger')).toBeInTheDocument();
    });
    
    const addToCartForm = screen.getAllByText('Add to Cart')[0].closest('form');
    
    if (addToCartForm) {
      fireEvent.submit(addToCartForm);
      
      const cartItems = selectCartItems(store.getState() as any);
      expect(cartItems).toHaveLength(1);
      expect(cartItems[0].meal).toBe('Test Burger');
      expect(cartItems[0].quantity).toBe(1);
    }
  });
  
  it('should add item with specified quantity to cart', async () => {
    renderWithProviders(<Menu />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Burger')).toBeInTheDocument();
    });
    
    const quantityInputs = screen.getAllByRole('spinbutton');
    const addToCartForm = screen.getAllByText('Add to Cart')[0].closest('form');
    
    if (quantityInputs[0] && addToCartForm) {
      fireEvent.change(quantityInputs[0], { target: { value: '3' } });
      fireEvent.submit(addToCartForm);
      
      const cartItems = selectCartItems(store.getState() as any);
      expect(cartItems).toHaveLength(1);
      expect(cartItems[0].meal).toBe('Test Burger');
      expect(cartItems[0].quantity).toBe(3);
    }
  });
  
  it('should update quantity of existing item in cart', async () => {
    renderWithProviders(<Menu />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Burger')).toBeInTheDocument();
    });
    
    const addToCartForm = screen.getAllByText('Add to Cart')[0].closest('form');
    
    if (addToCartForm) {
      fireEvent.submit(addToCartForm);
      
      fireEvent.submit(addToCartForm);
      
      const cartItems = selectCartItems(store.getState() as any);
      expect(cartItems).toHaveLength(1);
      expect(cartItems[0].meal).toBe('Test Burger');
      expect(cartItems[0].quantity).toBe(2);
    }
  });
}); 