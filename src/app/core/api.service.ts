import {
  HttpClient
} from '@angular/common/http'
import {
  Injectable,
  inject
} from '@angular/core'
import {
  Observable,
  of,
  map,
  tap,
  switchMap,
  iif,
  catchError,
} from 'rxjs'
import {
  type Coords,
  type CityLocation,
  type WeatherData,
  type WeatherMode,
  type BaseWeatherData,
  type HandledWeatherData,
  type ForecastData
} from './api.types'
import {
  ConfigService
} from './config.service'

const API_DOMAIN = 'https://api.openweathermap.org/' as const

type CoordsReturned = Coords | null

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  #http = inject(HttpClient)
  #configService = inject(ConfigService)
  #cachedCoords = new Map<string, Coords>()
  #coordsReq = new Map<string, Observable<CoordsReturned>>()
  #apiKey = this.#configService.getSettings('API_KEY')

  getWeatherData(city: string, mode: WeatherMode): Observable<HandledWeatherData[]> {
    return this.#getCityCoords(city)
      .pipe(
        switchMap((coords) => (
          iif(
            () => !!coords,
            of('').pipe(switchMap(() => this.#requestData(coords!, mode))),
            of([])
          )
        ))
      )
  }

  #getCityCoords(city: string): Observable<CoordsReturned> {
    if (this.#cachedCoords.has(city)) {
      return of(this.#cachedCoords.get(city)!)
    }

    if (this.#coordsReq.has(city)) {
      return this.#coordsReq.get(city)!
    }

    const req$ = this.#http.get<CityLocation[]>(
      `${API_DOMAIN}geo/1.0/direct`,
      {
        params: {
          q: encodeURI(city),
          appid: this.#apiKey
        }
      }
    ).pipe(
      map(([first]) => {
        const { lat, lon } = first || {}
        return lat && lon ? { lat, lon } : null
      }),
      tap((coords) => {
        if (coords) {
          this.#cachedCoords.set(city, coords)
        }
      }),
      catchError(() => of(null))
    )

    this.#coordsReq.set(city, req$)
    return req$
  }

  #requestData(coords: Coords, mode: WeatherMode): Observable<HandledWeatherData[]> {
    return this.#http.get<WeatherData | ForecastData>(
      `${API_DOMAIN}data/2.5/${mode}`,
      {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          appId: this.#apiKey,
          units: 'metric'
        }
      }
    ).pipe(
      map((response) => {
        return (
          response.hasOwnProperty('list')
            ? this.#handleData((response as ForecastData).list)
            : this.#handleData([response as WeatherData])
        )
      }),
    )
  }

  #handleData<T extends BaseWeatherData>(data: T[]): HandledWeatherData[] {
    return data.map((item) => ({
      description: item.weather[0]?.description,
      dt: item.dt * 1000, // transform in ms
      humidity: item.main.humidity,
      temp: item.main.temp,
      tempMax: item.main.temp_max,
      tempMin: item.main.temp_min
    }))
  }
}
