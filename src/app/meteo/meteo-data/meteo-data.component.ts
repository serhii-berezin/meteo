import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core'
import {
  AsyncPipe,
  DatePipe
} from '@angular/common'
import {
  toObservable
} from '@angular/core/rxjs-interop'
import {
  MatProgressBarModule
} from '@angular/material/progress-bar';
import {
  catchError,
  debounceTime,
  switchMap,
  of,
  filter,
  tap,
  merge
} from 'rxjs'
import {
  ApiService
} from '../../core/api.service'
import {
  type WeatherMode
} from '../../core/api.types';

@Component({
  selector: 'bm-meteo-data',
  standalone: true,
  imports: [AsyncPipe, DatePipe, MatProgressBarModule],
  templateUrl: './meteo-data.component.html',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: .5rem;
    }

    .weather-item > div {
      &::before {
        content: attr(label) ': ';
        opacity: .6;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeteoDataComponent {
  type = input.required<WeatherMode>()
  city = input.required<string>()
  #city$ = toObservable(this.city)
  #type$ = toObservable(this.type)
  #apiService = inject(ApiService)
  errorMsg = ''
  meteoData$ = (
    merge(this.#city$, this.#type$)
      .pipe(
        filter(() => this.city().length >= 3),
        tap(() => {
          this.isLoading = true
          this.errorMsg = ''
        }),
        debounceTime(500),
        switchMap(() => this.#apiService.getWeatherData(this.city(), this.type())),
        catchError((e) => {
          this.errorMsg = e?.error?.message || e?.message
          return of([])
        }),
        tap(() => { this.isLoading = false }),
      )
  )
  isLoading = true
}
