import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFavorites, setFavorites } from "../utils/storage";

interface FavoritesState {
  favorites: string[];
}

const initialState: FavoritesState = {
  favorites: getFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        setFavorites(state.favorites);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
      setFavorites(state.favorites);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.favorites.indexOf(action.payload);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
      setFavorites(state.favorites);
    },
    setFavoriteList: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
      setFavorites(state.favorites);
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, setFavoriteList } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
