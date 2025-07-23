import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private authService = inject(AuthService);
  title: string = 'User Dashboard';

  constructor() {
    this.updateTitleBasedOnRole(); // Update the title dynamically
  }

  get username(): string | null {
    return this.authService.getLoggedInUsername();
  }

  get authRole(): string | null {
    return this.authService.getLoggedInRole();
  }

  // Method to update the title based on the user's role
  private updateTitleBasedOnRole(): void {
    const role = this.authService.getLoggedInRole(); // Use injected service
    if (role === 'admin') {
      this.title = 'Admin Dashboard';
    }
  }
}
