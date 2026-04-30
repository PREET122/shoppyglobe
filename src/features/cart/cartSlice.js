import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const incomingProduct = action.payload
      const existingItem = state.items.find(
        (item) => item.id === incomingProduct.id,
      )

      if (existingItem) {
        existingItem.quantity += 1
        return
      }

      state.items.push({ ...incomingProduct, quantity: 1 })
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload)

      if (item) {
        item.quantity += 1
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload)

      if (item) {
        item.quantity = Math.max(1, item.quantity - 1)
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions

const selectCartState = (state) => state.cart ?? initialState

export const selectCartItems = (state) => selectCartState(state).items

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
)

export const selectCartSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
)

export default cartSlice.reducer
