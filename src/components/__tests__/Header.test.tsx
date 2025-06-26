import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import cartReducer, { addToCart } from '../../store/slices/cartSlice';
import authReducer, { loginSuccess } from '../../store/slices/authSlice';
import orderReducer from '../../store/slices/orderSlice';
import { ThemeProvider } from '../../contexts/ThemeContext';

vi.mock('../../assets/icons/cart-icon.svg', () => ({
  default: 'cart-icon-path'
}));
vi.mock('../../assets/icons/logo.svg', () => ({
  default: 'logo-path'
}));

describe('Header Component', () => {
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
          <ThemeProvider>
            {component}
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  };
  
  it('should display zero cart count when cart is empty', () => {
    renderWithProviders(<Header />);
    
    const cartCount = screen.getByText('0');
    expect(cartCount).toBeInTheDocument();
  });
  
  it('should display correct cart count when items are added', () => {
    const product1 = { id: '1', name: 'Test Product 1', price: 10 };
    const product2 = { id: '2', name: 'Test Product 2', price: 15 };
    
    store.dispatch(addToCart({ product: product1, quantity: 2 }));
    store.dispatch(addToCart({ product: product2, quantity: 3 }));
    
    renderWithProviders(<Header />);
    
    const cartCount = screen.getByText('5');
    expect(cartCount).toBeInTheDocument();
  });
  
  it('should display login link when user is not authenticated', () => {
    renderWithProviders(<Header />);
    
    const loginLink = screen.getByText('Login');
    expect(loginLink).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
  
  it('should display logout link when user is authenticated', () => {
    const user = { id: '1', username: 'testuser', email: 'test@example.com' };
    
    store.dispatch(loginSuccess(user));
    
    renderWithProviders(<Header />);
    
    const logoutLink = screen.getByText('Logout');
    expect(logoutLink).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
}); 