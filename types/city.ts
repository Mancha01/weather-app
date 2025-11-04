export interface City {
  id: string;
  name: string;
  country: string;
  region?: string;
  lat: number;
  lon: number;
  temperature?: number;
  isFavorite: boolean;
  lastUpdated?: Date;
}

export interface CityWithWeather extends City {
  temperature: number;
  weatherDescription: string;
  weatherIcon: string;
  humidity: number;
  windSpeed: number;
  lastUpdated: Date;
}

export interface GeonamesPlace {
  geonameId: number;
  name: string;
  toponymName: string;
  countryName?: string;
  countryCode: string;
  adminName1?: string;
  lat: string;
  lng: string;
  population: number;
  fcl: string;
  fcode: string;
}

export interface GeonamesResponse {
  geonames: GeonamesPlace[];
}
