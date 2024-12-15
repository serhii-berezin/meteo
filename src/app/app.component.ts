import { Component } from '@angular/core'
import { MeteoComponent } from './meteo/meteo.component'

@Component({
  selector: 'bm-root',
  standalone: true,
  imports: [MeteoComponent],
  template: `<bm-meteo />`,
  styles: `
    :host {
      display: flex;
      justify-content: center;
    }

    bm-meteo {
      width: 360px;
    }
  `,
})
export class AppComponent {}
