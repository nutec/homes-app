import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClickCounterComponent } from '../click-counter/click-counter.component';
import { BehaviorSubject, interval, map, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ClickCounterComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private titleSubject = new BehaviorSubject<string>('Homes App');
  title$ = this.titleSubject.asObservable();

  liveTitle$ = interval(1000).pipe(
    startWith(0),
    map(count => `Homes App (active for ${count} seconds)`)
  );
}
