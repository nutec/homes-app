import { Component } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-sandbox',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-sandbox.component.html',
  styleUrls: ['./rxjs-sandbox.component.css'],
})
export class RxjsSandboxComponent {
  private coldObservable: Observable<number>;
  private hotObservable: Subject<number> = new Subject<number>();

  constructor() {
    // Define a cold observable
    this.coldObservable = new Observable<number>((observer) => {
      console.log('Cold Observable Execution Started');
      // Emit values 1, 2, and 3
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    this.createHotObservable();
  }

  subscribeToObservable(): void {
    console.log('Observer 1 Subscribed!');
    this.coldObservable.subscribe({
      next: (value) => console.log(`Observer 1 Received: ${value}`),
      complete: () => console.log('Observer 1 Complete!'),
    });

    console.log('Observer 2 Subscribed!');
    this.coldObservable.subscribe({
      next: (value) => console.log(`Observer 2 Received: ${value}`),
      complete: () => console.log('Observer 2 Complete!'),
    });
  }

  // Method to create a hot observable
  private createHotObservable(): void {
    // Use interval to emit numbers every 1 second, stopping after 5 emissions
    const source$ = interval(1000).pipe(take(5));

    // Multicasting values (making it "hot") using a Subject
    source$.subscribe(this.hotObservable);
  }

  subscribeToHotObservable(observerId: string): void {
    console.log(`${observerId} Subscribed!`);
    this.hotObservable.subscribe({
      next: (value) => console.log(`${observerId} Received: ${value}`),
      complete: () => console.log(`${observerId} Complete!`),
    });
  }
}
