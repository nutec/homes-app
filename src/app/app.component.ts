import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<main>
    <app-header></app-header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main> `,
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, HeaderComponent],
})
export class AppComponent {
  title = 'homes';
}
