import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ClickCounterComponent } from '../click-counter/click-counter.component';
import { BehaviorSubject, interval, map, startWith } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ClickCounterComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);

  private titleSubject = new BehaviorSubject<string>('Homes App');
  title$ = this.titleSubject.asObservable();

  liveTitle$ = interval(1000).pipe(
    startWith(0),
    map((count) => `Homes App (active for ${count} seconds)`)
  );

  get username(): string | null {
    return this.authService.getLoggedInUsername();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout(); // Clear token and reset state
    this.router.navigate(['/']); // Redirect to home page
  }
}
