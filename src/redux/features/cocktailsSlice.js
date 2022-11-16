import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {
    setCocktails: (state, action) => {
      state = action.payload
    },
  },
})

export const { setCocktails } = cocktailsSlice.actions

export default cocktailsSlice.reducer
