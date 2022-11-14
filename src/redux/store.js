import { configureStore } from '@reduxjs/toolkit'
import cocktailsReducer from './features/cocktailsSlice'

export const store = configureStore({
  reducer: { cocktails: cocktailsReducer },
})
