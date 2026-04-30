import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import productsReducer from '../features/products/productsSlice'

const CART_STORAGE_KEY = 'shoppyglobe-cart'

function loadCartState() {
  try {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : undefined
  } catch {
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  // Restore the cart between refreshes without complicating the slice itself.
  preloadedState: {
    cart: loadCartState(),
  },
})

store.subscribe(() => {
  try {
    // Persist only the cart slice so the shopping flow survives page reloads.
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(store.getState().cart),
    )
  } catch {
    // Ignore storage write failures so the app still works offline/private mode.
  }
})
