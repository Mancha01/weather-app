import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City, CityWithWeather, LoadingState } from "../types";

interface WeatherState {
  cities: City[];
  loading: LoadingState;
  searchResults: CityWithWeather[];
  currentLocation: CityWithWeather | null;
}

const initialState: WeatherState = {
  cities: [],
  loading: { isLoading: false, error: null },
  searchResults: [],
  currentLocation: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload;
    },
    updateCityWeather: (
      state,
      action: PayloadAction<{ cityId: string; weather: CityWithWeather }>
    ) => {
      const index = state.cities.findIndex(
        (city) => city.id === action.payload.cityId
      );
      if (index !== -1) {
        state.cities[index] = action.payload.weather;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.isLoading = action.payload;
      if (action.payload) {
        state.loading.error = null; // Clear error when starting to load
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading.error = action.payload;
      state.loading.isLoading = false;
    },
    clearError: (state) => {
      state.loading.error = null;
    },
    setSearchResults: (state, action: PayloadAction<CityWithWeather[]>) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setCurrentLocation: (
      state,
      action: PayloadAction<CityWithWeather | null>
    ) => {
      state.currentLocation = action.payload;
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
    },
  },
});

export const {
  setCities,
  updateCityWeather,
  setLoading,
  setError,
  clearError,
  setSearchResults,
  clearSearchResults,
  setCurrentLocation,
  removeCity,
} = weatherSlice.actions;

export default weatherSlice.reducer;
