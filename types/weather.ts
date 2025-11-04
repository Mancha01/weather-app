export interface WeatherLocation {
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  localtime: string;
  localtime_epoch: number;
  utc_offset: string;
}

export interface WeatherCurrent {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
}

export interface WeatherRequest {
  type: string;
  query: string;
  language: string;
  unit: string;
}

export interface WeatherResponse {
  request: WeatherRequest;
  location: WeatherLocation;
  current: WeatherCurrent;
}

export interface WeatherError {
  success: false;
  error: {
    code: number;
    type: string;
    info: string;
  };
}
