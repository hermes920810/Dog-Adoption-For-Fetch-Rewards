import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  dogIds: string[];
}

const initialState: FavoritesState = {
  dogIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.dogIds.includes(action.payload)) {
        state.dogIds.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.dogIds = state.dogIds.filter(id => id !== action.payload);
    },
    clearFavorites: (state) => {
      state.dogIds = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
