import { createSlice } from '@reduxjs/toolkit';

const LOCAL_STORAGE_KEY = 'cartItems';

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
};

const loadCartFromLocalStorage = () => {
  const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedItems ? JSON.parse(storedItems) : [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(), // Load items from local storage
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Increment by the specified quantity
      } else {
        state.items.push({ ...action.payload }); // Add new item without overriding quantity
      }
      saveCartToLocalStorage(state.items); // Save to local storage
    },    
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id); // Remove item from cart
      saveCartToLocalStorage(state.items); // Save to local storage
    },
    clearCart: (state) => {
      state.items = []; // Clear all items from cart
      saveCartToLocalStorage(state.items); // Save to local storage
    },
    updateQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If the updated quantity is zero or less, remove the item
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== existingItem.id);
        } else {
          // Otherwise, update the item's quantity
          existingItem.quantity = action.payload.quantity;
        }
      }
      saveCartToLocalStorage(state.items); // Save to local storage
    },
  },
});

export const { addItem, removeItem, clearCart, updateQuantity  } = cartSlice.actions;

export default cartSlice.reducer;
