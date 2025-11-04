export * from "./weather";
export * from "./city";
export * from "./note";

// Additional utility types
export interface ApiError {
  message: string;
  code?: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export type TemperatureUnit = "celsius" | "fahrenheit";

// Import types for use in AppState
import type { City } from "./city";
import type { Note } from "./note";

export interface AppState {
  cities: City[];
  favorites: string[];
  notes: Note[];
  currentLocation: City | null;
  loading: LoadingState;
}
