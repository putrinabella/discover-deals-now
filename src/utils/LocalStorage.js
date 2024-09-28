const LOCAL_STORAGE_KEY = 'cartItems';

export const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
};

export const loadCartFromLocalStorage = () => {
  const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedItems ? JSON.parse(storedItems) : [];
};
