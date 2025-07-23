import { Component, inject, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SpaceXService } from 'src/app/services/space-x.service';

@Component({
  selector: 'app-space-x',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './space-x.component.html',
  styleUrls: ['./space-x.component.css'],
})
export class SpaceXComponent {
  private spaceXService = inject(SpaceXService);

  launches: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  // Lifecycle method to initialize data on component load
  ngOnInit(): void {
    this.getLaunches();
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
}
