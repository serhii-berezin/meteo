import { Component } from '@angular/core';

@Component({
  selector: 'bm-root',
  standalone: true,
  imports: [],
  template: `
    <h1>Welcome to {{title}}!</h1>

    
  `,
  styles: [],
})
export class AppComponent {
  title = 'berezin-meteo';
}