import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="brand-name">
      <div class="brand-name-inner">
        <a [routerLink]="['/']"><img class="brand-logo" src="assets/logo.svg" alt="logo" aria-hidden="true" /></a>
        <h1>{{title()}}</h1>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 title = signal('Homes App');
}
