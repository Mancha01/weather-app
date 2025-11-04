import { Note } from "../types/note";
import { CachedWeather } from "../types";
import { STORAGE_KEYS } from "./constants";

export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading favorites from localStorage:", error);
    return [];
  }
};

export const setFavorites = (favorites: string[]): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
  }
};

export const getNotes = (): Note[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.NOTES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading notes from localStorage:", error);
    return [];
  }
};

export const setNotes = (notes: Note[]): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes to localStorage:", error);
  }
};

export const getCachedCities = (): Record<string, CachedWeather> => {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CITIES_CACHE);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error reading cities cache from localStorage:", error);
    return {};
  }
};

export const setCachedCities = (cache: Record<string, CachedWeather>): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.CITIES_CACHE, JSON.stringify(cache));
  } catch (error) {
    console.error("Error saving cities cache to localStorage:", error);
  }
};

export const clearAllData = (): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.NOTES);
    localStorage.removeItem(STORAGE_KEYS.CITIES_CACHE);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
