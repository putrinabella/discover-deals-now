import { createSlice } from '@reduxjs/toolkit';

// Function to load stock from local storage, or set default stock if not available
const loadProductStockFromLocalStorage = (products = []) => {
  const storedStock = localStorage.getItem('productStock');
  
  if (storedStock) {
    // Return the stored stock from localStorage if available
    return JSON.parse(storedStock);
  }
  
  // Initialize default stock for all products (20 each) if no stock in localStorage
  const defaultStock = {};
  products.forEach(product => {
    defaultStock[product.id] = 20;
  });
  
  localStorage.setItem('productStock', JSON.stringify(defaultStock));
  return defaultStock;
};

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    stock: {},  // Stock will be initialized later when products are loaded
  },
  reducers: {
    setProducts: (state, action) => {
      const storedStock = loadProductStockFromLocalStorage(action.payload);
      state.items = action.payload.map(product => ({
        ...product,
        quantity: storedStock[product.id]   // Use stored stock or default to 20
      }));
      
      // Set the stock in the state to the stored stock or default stock
      state.stock = storedStock;
    },
    setQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      // Update quantity in the local state and local storage
      state.stock[productId] = quantity;
      localStorage.setItem('productStock', JSON.stringify(state.stock));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    reduceStock: (state, action) => {
      const { productId, quantity } = action.payload;
      // Reduce stock only if the quantity is less than or equal to available stock
      if (state.stock[productId] >= quantity) {
        state.stock[productId] -= quantity;
        localStorage.setItem('productStock', JSON.stringify(state.stock));
      }
    },
  },
});

export const { setProducts, setQuantity, setLoading, setError, reduceStock } = productSlice.actions;

export default productSlice.reducer;
