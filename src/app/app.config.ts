import {
  provideHttpClient
} from '@angular/common/http'
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  APP_INITIALIZER
} from '@angular/core'
import {
  provideAnimationsAsync
} from '@angular/platform-browser/animations/async'
import {
  ConfigService
} from './core/config.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService) => async () => {
        await configService.init()
      }
    },
  ]
}
