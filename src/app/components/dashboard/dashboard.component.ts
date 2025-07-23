import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1>{{ title }}</h1>
    <p>Welcome to your dashboard! Only logged-in users can see this page.</p>
  `,
})
export class DashboardComponent {
  private authService = inject(AuthService);
  title: string = 'User Dashboard';

  constructor() {
    this.updateTitleBasedOnRole(); // Update the title dynamically
  }

  // Method to update the title based on the user's role
  private updateTitleBasedOnRole(): void {
    const role = this.authService.getLoggedInRole(); // Use injected service
    if (role === 'admin') {
      this.title = 'Admin Dashboard';
    }
  }
}
