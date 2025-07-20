import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, scan, startWith } from 'rxjs';

@Component({
  selector: 'app-click-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './click-counter.component.html',
  styleUrls: ['./click-counter.component.css']
})
export class ClickCounterComponent {
  private clickSubject = new Subject<void>();

  clickCount$ = this.clickSubject.pipe(
    scan((count) => count + 1, 0),
    startWith(0),
  );

  handleClick() {
    this.clickSubject.next();
  }
}
