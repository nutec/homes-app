import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { SpaceXService } from 'src/app/services/space-x.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private spaceXService = inject(SpaceXService);

  launches: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  title: string = 'User Dashboard';

  constructor() {
    this.updateTitleBasedOnRole();
    this.getLaunches();
  }

  get username(): string | null {
    return this.authService.getLoggedInUsername();
  }

  get authRole(): string | null {
    return this.authService.getLoggedInRole();
  }

  getLaunches(): void {
    this.spaceXService.getUpcomingLaunches().subscribe({
      next: (result) => {
        this.launches = result?.data?.launchesUpcoming || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching launches:', error);
        this.errorMessage = 'Failed to load SpaceX launches.';
        this.isLoading = false;
      },
    });
  }

  openVideoLink(videoLink: string): void {
    window.open(videoLink, '_blank'); // Opens the video link in a new tab
  }

  // Method to update the title based on the user's role
  private updateTitleBasedOnRole(): void {
    const role = this.authService.getLoggedInRole(); // Use injected service
    if (role === 'admin') {
      this.title = 'Admin Dashboard';
    }
  }
}
