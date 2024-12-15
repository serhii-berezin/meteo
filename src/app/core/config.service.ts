import { Injectable } from '@angular/core'

type Config = Record<string, any>

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  #config: Config = {}

  async init(): Promise<void> {
    return fetch('/config.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Loading configuration failed')
        }
        return response.json()
      })
      .then((config) => {
        this.#config = config
      })
  }

  getSettings(key: string): any {
    return this.#config.hasOwnProperty(key) ? this.#config[key] : null
  }
}
