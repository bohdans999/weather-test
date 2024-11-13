// OpenWeatherAPI weather data response type. Includes only needed fields
export interface IWeatherReportResponse {
  name: string; // Name of the city
  id: number; // ID of the cityI
  weather: {
    main: string; // General weather condition
    description: string;
    icon: string; // Icon ID
  }[];
  main: {
    temp: number; // Celsius or Fahrenheit
    feels_like: number; // Celsius or Fahrenheit
    pressure: number; // hPa
    humidity: number; // %
  };
  wind: {
    speed: number; // M/s or Mi/h
    deg: number; // Degrees
    gust: number; // M/s or Mi/h
  };
  clouds: {
    all: number; // %
  };
}

export interface IWeatherReport extends IWeatherReportResponse {
  measurement: Unit;
}

export enum Unit {
  IMPERIAL = 'imperial',
  METRIC = 'metric',
}
