import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from '../weather/weather.component';
import { SpaceXComponent } from '../space-x/space-x.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, WeatherComponent, SpaceXComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private authService = inject(AuthService);

  title: string = 'User Dashboard';

  constructor() {
    this.updateTitleBasedOnRole();
  }

  get username(): string | null {
    return this.authService.getLoggedInUsername();
  }

  get authRole(): string | null {
    return this.authService.getLoggedInRole();
  }

  private updateTitleBasedOnRole(): void {
    const role = this.authService.getLoggedInRole();
    if (role === 'admin') {
      this.title = 'Admin Dashboard';
    }
  }
}
