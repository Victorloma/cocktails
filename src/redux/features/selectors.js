import { createSelector } from '@reduxjs/toolkit'

export const selectCocktailModal = createSelector(
  (state) => state.modal.showModal,
  (cocktailModal) => cocktailModal
)
