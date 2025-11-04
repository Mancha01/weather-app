import axios from "axios";
import { GeonamesResponse, GeonamesPlace } from "../types/city";

const GEONAMES_USERNAME = process.env.NEXT_PUBLIC_GEONAMES_USERNAME;
const GEONAMES_BASE_URL = "http://api.geonames.org";

if (!GEONAMES_USERNAME) {
  throw new Error("Geonames username is not configured");
}

export const reverseGeocode = async (
  lat: number,
  lon: number
): Promise<GeonamesPlace | null> => {
  try {
    const response = await axios.get<GeonamesResponse>(
      `${GEONAMES_BASE_URL}/findNearbyPlaceNameJSON`,
      {
        params: {
          lat,
          lng: lon,
          username: GEONAMES_USERNAME,
          maxRows: 1,
        },
      }
    );

    const places = response.data.geonames;
    return places.length > 0 ? places[0] : null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Geonames reverse geocoding failed: ${error.message}`);
    }
    throw error;
  }
};

export const searchCities = async (query: string): Promise<GeonamesPlace[]> => {
  try {
    const response = await axios.get<GeonamesResponse>(
      `${GEONAMES_BASE_URL}/searchJSON`,
      {
        params: {
          q: query,
          maxRows: 10,
          username: GEONAMES_USERNAME,
          featureClass: "P", // populated places
          style: "FULL",
        },
      }
    );

    return response.data.geonames;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Geonames search failed: ${error.message}`);
    }
    throw error;
  }
};

export const isLocationApiAvailable = (): boolean => {
  return !!GEONAMES_USERNAME;
};
