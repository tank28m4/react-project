import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface Address {
  street: string;
  house: string;
}

interface Order {
  id: string;
  items: any[];
  address: Address;
  totalAmount: number;
  date: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    placeOrderSuccess: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      state.loading = false;
    },
    placeOrderFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const selectOrders = (state: RootState) => state.order.orders;
export const selectOrderLoading = (state: RootState) => state.order.loading;
export const selectOrderError = (state: RootState) => state.order.error;

export const { placeOrderStart, placeOrderSuccess, placeOrderFailed } = orderSlice.actions;
export default orderSlice.reducer; 