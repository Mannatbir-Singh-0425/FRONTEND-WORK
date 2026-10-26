import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "little-market-cart";

function loadCart() {
  if (typeof window === "undefined") return [];

  try {
    const savedCart = window.localStorage.getItem(STORAGE_KEY);
    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);
    if (
      Array.isArray(parsedCart) &&
      parsedCart.every(
        (item) =>
          item &&
          typeof item.id === "number" &&
          typeof item.name === "string" &&
          typeof item.price === "number" &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0,
      )
    ) {
      return parsedCart;
    }

    console.warn("Saved cart data was invalid and has been ignored.");
  } catch (error) {
    console.error("Could not read the saved cart from localStorage.", error);
  }

  return [];
}

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.find((cartItem) => cartItem.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action) {
      const item = state.find((cartItem) => cartItem.id === action.payload);
      if (!item) return;

      if (item.quantity === 1) {
        return state.filter((cartItem) => cartItem.id !== action.payload);
      }

      item.quantity -= 1;
    },
    clearCart() {
      return [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
