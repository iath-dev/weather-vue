export interface WeatherResponse {
  coord: Coord
  weather: Weather[]
  base: string
  main: WeatherDetails
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: WeatherResponseSys
  timezone: number
  id: number
  name: string
  cod: number
}

export interface Clouds {
  all: number
}

export interface Coord {
  lon: number
  lat: number
}

export interface WeatherDetails {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
  temp_kf?: number
}

export interface WeatherResponseSys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

export interface Weather {
  id: number
  main: WeatherEnum
  description: string
  icon: string
}

export enum WeatherEnum {
  Clear = 'Clear',
  Clouds = 'Clouds',
  Rain = 'Rain'
}

export interface Wind {
  speed: number
  deg: number
  gust: number
}

export interface ForecastResponse {
  cod: string
  message: number
  cnt: number
  list: Forecast[]
  city: City
}

export interface City {
  id: number
  name: string
  coord: Coord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export interface Forecast {
  dt: number
  main: WeatherDetails
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  sys: ListSys
  dt_txt: Date
  rain?: Rain
}

export interface Rain {
  '3h': number
}

export interface ListSys {
  pod: Pod
}

export enum Pod {
  D = 'd',
  N = 'n'
}
