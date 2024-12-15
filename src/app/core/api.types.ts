type Cod = string | number

type Coords = Readonly<{
  lat: number
  lon: number
}>

type CityLocation = Coords & Readonly<{
  country: string
  name: string
  local_names: Record<string, string>
}>

type WeatherCity = Readonly<{
  coord: Coords
  id: number
  name: string
  country: string
  timezone: number
  sunrise: number,
  sunset: number
  population?: number
}>

type WeatherShort = Readonly<{
  id: number
  main: string
  description: string
  icon: string
}>

type WeatherMain = Readonly<{
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}>

type WeatherWind = Readonly<{
  speed: number
  deg: number
  gust: number
}>

type BaseWeatherData = Readonly<{
  cod: Cod
  main: WeatherMain
  weather: WeatherShort[]
  clouds: Record<string,number>
  snow: Record<string, number>
  wind: WeatherWind
  visibility: number
  dt: number
}>

type WeatherData = WeatherCity & BaseWeatherData & Readonly<{
  base: string
  sys: {
      type: number
      id: number
      country: string
      sunrise: number
      sunset: number
  },
}>

type ForecastItem = BaseWeatherData & Readonly<{
  pop: number
  sys: {
    pod: string
  }
  dt_txt: string
}>

type ForecastData = Readonly<{
  cod: Cod,
  message: string | number
  cnt: number
  city: WeatherCity,
  list: ForecastItem[]
}>

type WeatherMode = 'weather' | 'forecast'

type HandledWeatherData = Readonly<{
  humidity: number
  description: string
  tempMax: number
  tempMin: number
  temp: number
  dt: number
}>

export {
  type Coords,
  type CityLocation,
  type WeatherData,
  type WeatherMode,
  type ForecastData,
  type ForecastItem,
  type BaseWeatherData,
  type HandledWeatherData
}