import { configureStore } from '@reduxjs/toolkit'
import productSlice from '../features/product/productSlice';
import cartSlice from '../features/cart/cartSlice';

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
  },
});

export default store;