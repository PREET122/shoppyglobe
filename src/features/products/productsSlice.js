import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchTerm: '',
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    clearSearchTerm: (state) => {
      state.searchTerm = ''
    },
  },
})

export const { setSearchTerm, clearSearchTerm } = productsSlice.actions

export const selectSearchTerm = (state) => state.products.searchTerm

export default productsSlice.reducer
