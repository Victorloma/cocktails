import { configureStore } from '@reduxjs/toolkit'
import { cocktailsApi } from './features/api/apiSlice'
import modalReducer from './features/modalSlice'

export const store = configureStore({
  reducer: {
    [cocktailsApi.reducerPath]: cocktailsApi.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cocktailsApi.middleware),
})
