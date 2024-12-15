import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core'
import {
  MatButtonModule
} from '@angular/material/button'
import {
  MatCardModule
} from '@angular/material/card'
import {
  MatFormFieldModule
} from '@angular/material/form-field'
import {
  MatIconModule
} from '@angular/material/icon'
import {
  MatInputModule
} from '@angular/material/input'
import {
  MatTabsModule
} from '@angular/material/tabs'
import {
  MatToolbarModule
} from '@angular/material/toolbar'
import {
  MeteoDataComponent
} from './meteo-data/meteo-data.component'
import {
  MatSelectModule
} from '@angular/material/select'

@Component({
  selector: 'bm-meteo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MeteoDataComponent,
    MatSelectModule,
  ],
  templateUrl: './meteo.component.html',
  styleUrl: './meteo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeteoComponent {
}
