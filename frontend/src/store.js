import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import wishlistReducer from './slices/wishlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
