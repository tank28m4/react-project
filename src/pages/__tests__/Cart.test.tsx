import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../Cart';
import cartReducer, { addToCart } from '../../store/slices/cartSlice';
import authReducer from '../../store/slices/authSlice';
import orderReducer from '../../store/slices/orderSlice';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Cart Component', () => {
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
  
  it('should display empty cart message when cart is empty', () => {
    renderWithProviders(<Cart />);
    
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to menu/i)).toBeInTheDocument();
  });
  
  it('should display cart items when items exist in cart', () => {
    const product = { 
      id: '1', 
      name: 'Test Product', 
      meal: 'Test Product', 
      price: 10, 
      img: 'test-image.jpg' 
    };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    
    renderWithProviders(<Cart />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$ 10.00 USD')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });
  
  it('should update quantity when input is changed', () => {
    const product = { 
      id: '1', 
      name: 'Test Product', 
      meal: 'Test Product', 
      price: 10, 
      img: 'test-image.jpg' 
    };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    
    renderWithProviders(<Cart />);
    
    const quantityInput = screen.getByDisplayValue('2') as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: '5' } });
    
    expect(quantityInput.value).toBe('5');
  });
  
  it('should remove item when remove button is clicked', () => {
    const product = { 
      id: '1', 
      name: 'Test Product', 
      meal: 'Test Product', 
      price: 10, 
      img: 'test-image.jpg' 
    };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    
    renderWithProviders(<Cart />);
    
    const removeButton = screen.getByText('X');
    fireEvent.click(removeButton);
    
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });
  
  it('should display address form when items exist in cart', () => {
    const product = { 
      id: '1', 
      name: 'Test Product', 
      meal: 'Test Product', 
      price: 10, 
      img: 'test-image.jpg' 
    };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    
    renderWithProviders(<Cart />);
    
    expect(screen.getByText('Street')).toBeInTheDocument();
    expect(screen.getByText('House')).toBeInTheDocument();
    expect(screen.getByText('Order')).toBeInTheDocument();
  });
  
  it('should show alert when placing order without address', () => {
    const product = { 
      id: '1', 
      name: 'Test Product', 
      meal: 'Test Product', 
      price: 10, 
      img: 'test-image.jpg' 
    };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    
    global.alert = vi.fn();
    
    renderWithProviders(<Cart />);
    
    const orderButton = screen.getByText('Order');
    fireEvent.click(orderButton);
    
    expect(global.alert).toHaveBeenCalledWith('Please fill in the delivery address');
  });
  
  it('should place order successfully with valid address', async () => {
    const product = { 
      id: '1', 
      name: 'Test Product', 
      meal: 'Test Product', 
      price: 10, 
      img: 'test-image.jpg' 
    };
    
    store.dispatch(addToCart({ product, quantity: 2 }));
    
    global.alert = vi.fn();
    
    renderWithProviders(<Cart />);
    
    const streetInput = screen.getByLabelText('Street');
    const houseInput = screen.getByLabelText('House');
    const orderButton = screen.getByText('Order');
    
    fireEvent.change(streetInput, { target: { value: 'Test Street' } });
    fireEvent.change(houseInput, { target: { value: '123' } });
    fireEvent.click(orderButton);
    
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Order successfully placed!');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
  
  it('should display the correct total price for cart items', () => {
    const product1 = { 
      id: '1', 
      name: 'Test Product 1', 
      meal: 'Test Product 1', 
      price: 10, 
      img: 'test-image.jpg' 
    };
    
    const product2 = { 
      id: '2', 
      name: 'Test Product 2', 
      meal: 'Test Product 2', 
      price: 15, 
      img: 'test-image.jpg' 
    };
    
    store.dispatch(addToCart({ product: product1, quantity: 2 }));
    store.dispatch(addToCart({ product: product2, quantity: 1 }));
    
    renderWithProviders(<Cart />);
    
    expect(screen.getByText('$ 10.00 USD')).toBeInTheDocument();
    expect(screen.getByText('$ 15.00 USD')).toBeInTheDocument();
  });
}); 