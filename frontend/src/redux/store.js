import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice'
import cartReducer from './slice/CartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  }
});