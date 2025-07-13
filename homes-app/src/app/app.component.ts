import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<main>
    <header class="brand-name">
      <a [routerLink]="['/']"><img class="brand-logo" src="assets/logo.svg" alt="logo" aria-hidden="true" /></a>
    </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, RouterLink]
})
export class AppComponent {
  title = 'homes';
}
