import { City } from "../types";

export const LARGEST_CITIES: City[] = [
  {
    id: "aba",
    name: "Aba",
    country: "Nigeria",
    lat: 5.1167,
    lon: 7.3667,
    isFavorite: false,
  },
  {
    id: "abuja",
    name: "Abuja",
    country: "Nigeria",
    lat: 9.0765,
    lon: 7.3986,
    isFavorite: false,
  },
  {
    id: "benin-city",
    name: "Benin City",
    country: "Nigeria",
    lat: 6.3392,
    lon: 5.617,
    isFavorite: false,
  },
  {
    id: "ibadan",
    name: "Ibadan",
    country: "Nigeria",
    lat: 7.3775,
    lon: 3.947,
    isFavorite: false,
  },
  {
    id: "ilorin",
    name: "Ilorin",
    country: "Nigeria",
    lat: 8.4966,
    lon: 4.5421,
    isFavorite: false,
  },
  {
    id: "jos",
    name: "Jos",
    country: "Nigeria",
    lat: 9.8965,
    lon: 8.8583,
    isFavorite: false,
  },
  {
    id: "kaduna",
    name: "Kaduna",
    country: "Nigeria",
    lat: 10.5105,
    lon: 7.4165,
    isFavorite: false,
  },
  {
    id: "kano",
    name: "Kano",
    country: "Nigeria",
    lat: 12.0022,
    lon: 8.592,
    isFavorite: false,
  },
  {
    id: "lagos",
    name: "Lagos",
    country: "Nigeria",
    lat: 6.5244,
    lon: 3.3792,
    isFavorite: false,
  },
  {
    id: "maiduguri",
    name: "Maiduguri",
    country: "Nigeria",
    lat: 11.8464,
    lon: 13.1603,
    isFavorite: false,
  },
  {
    id: "ogbomosho",
    name: "Ogbomosho",
    country: "Nigeria",
    lat: 8.1333,
    lon: 4.25,
    isFavorite: false,
  },
  {
    id: "onitsha",
    name: "Onitsha",
    country: "Nigeria",
    lat: 6.1498,
    lon: 6.7857,
    isFavorite: false,
  },
  {
    id: "port-harcourt",
    name: "Port Harcourt",
    country: "Nigeria",
    lat: 4.8156,
    lon: 7.0498,
    isFavorite: false,
  },
  {
    id: "sokoto",
    name: "Sokoto",
    country: "Nigeria",
    lat: 13.0059,
    lon: 5.2476,
    isFavorite: false,
  },
  {
    id: "zaria",
    name: "Zaria",
    country: "Nigeria",
    lat: 11.0859,
    lon: 7.7227,
    isFavorite: false,
  },
];

export const WEATHERSTACK_BASE_URL = "http://api.weatherstack.com/current";
export const GEONAMES_BASE_URL = "http://api.geonames.org";

export const STORAGE_KEYS = {
  FAVORITES: "weather-app-favorites",
  NOTES: "weather-app-notes",
  CITIES_CACHE: "weather-app-cities-cache",
} as const;

export const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
