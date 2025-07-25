import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  interval,
  from,
  of,
} from 'rxjs';
import {
  take,
  map,
  filter,
  delay,
  mergeMap,
  concatMap,
  exhaustMap,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-sandbox',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-sandbox.component.html',
  styleUrls: ['./rxjs-sandbox.component.css'],
})
export class RxjsSandboxComponent {
  private coldObservable: Observable<number> = new Observable();
  private hotObservable: Subject<number> = new Subject<number>();

  constructor() {
    this.createColdObservable();
    this.createHotObservable();
  }

  /*
   * Cold Observable
   */
  private createColdObservable(): void {
    this.coldObservable = new Observable<number>((observer) => {
      console.log('Cold Observable Execution Started');
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });
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

  /*
   * Hot Observable
   */
  private createHotObservable(): void {
    const source$ = interval(1000).pipe(take(5));
    source$.subscribe(this.hotObservable);
  }

  subscribeToHotObservable(observerId: string): void {
    console.log(`${observerId} Subscribed!`);
    this.hotObservable.subscribe({
      next: (value) => console.log(`${observerId} Received: ${value}`),
      complete: () => console.log(`${observerId} Complete!`),
    });
  }

  /*
   * Subject Examples
   */
  subject$ = new Subject<string>();
  behaviorSubject$ = new BehaviorSubject<string>('84');
  replaySubject$ = new ReplaySubject<string>(2); // remembers last 2
  asyncSubject$ = new AsyncSubject<string>();

  emitToSubject(): void {
    this.subject$.next('Subject → A');
    this.subject$.next('Subject → B');
  }

  subscribeToSubject(observerId: string): void {
    this.subject$.subscribe({
      next: (val) => console.log(`${observerId} got from Subject: ${val}`),
    });
  }

  emitToBehaviorSubject(): void {
    this.behaviorSubject$.next('Behavior → X');
    this.behaviorSubject$.next('Behavior → Y');
  }

  subscribeToBehaviorSubject(observerId: string): void {
    this.behaviorSubject$.subscribe({
      next: (val) => console.log(`${observerId} got from BehaviorSubject: ${val}`),
    });
  }

  emitToReplaySubject(): void {
    this.replaySubject$.next('Replay → 1');
    this.replaySubject$.next('Replay → 2');
    this.replaySubject$.next('Replay → 3');
  }

  subscribeToReplaySubject(observerId: string): void {
    this.replaySubject$.subscribe({
      next: (val) => console.log(`${observerId} got from ReplaySubject: ${val}`),
    });
  }

  emitToAsyncSubject(): void {
    this.asyncSubject$.next('Async → OnlyThisWillEmit');
    this.asyncSubject$.complete();
  }

  subscribeToAsyncSubject(observerId: string): void {
    this.asyncSubject$.subscribe({
      next: (val) => console.log(`${observerId} got from AsyncSubject: ${val}`),
      complete: () => console.log(`${observerId} AsyncSubject complete!`),
    });
  }

  /*
   * Simple stream example with map & filter
   */
  stream1 = new Observable<number>((observer) => {
    let count = 0;
    const intervalId = setInterval(() => {
      const rand = Math.random() * 10;
      observer.next(rand);
      count++;
      if (count >= 6) {
        observer.complete();
        clearInterval(intervalId);
      }
    }, 1000);
  });

  stream2 = this.stream1.pipe(map((x) => Math.round(x)));
  stream3 = this.stream2.pipe(filter((x) => x > 3));

  stream1Listener(res: number) {
    console.log('Random generated:', res);
  }

  stream2Listener(res: number) {
    console.log('Rounded:', res);
  }

  stream3Listener(res: number) {
    console.log('Filtered > 3:', res);
  }

  runStream(): void {
    this.stream1.subscribe((res) => this.stream1Listener(res));
    this.stream2.subscribe((res) => this.stream2Listener(res));
    this.stream3.subscribe((res) => this.stream3Listener(res));
  }

  /*
   * Mapping operator demos
   */
  getOrders() {
    return from(['order 1', 'order 2', 'order 3', 'order 4']);
  }

  prepareOrder(order: string) {
    const delayTime = Math.floor(Math.random() * 1000) + 1;
    return of(`I'm ${order} - ready after ${delayTime} ms`).pipe(delay(delayTime));
  }

  runMergeMap() {
    this.getOrders()
      .pipe(mergeMap((order) => this.prepareOrder(order)))
      .subscribe((v) => console.log('mergeMap:', v));
  }

  runConcatMap() {
    this.getOrders()
      .pipe(concatMap((order) => this.prepareOrder(order)))
      .subscribe((v) => console.log('concatMap:', v));
  }

  runExhaustMap() {
    this.getOrders()
      .pipe(exhaustMap((order) => this.prepareOrder(order)))
      .subscribe((v) => console.log('exhaustMap:', v));
  }

  runSwitchMap() {
    this.getOrders()
      .pipe(switchMap((order) => this.prepareOrder(order)))
      .subscribe((v) => console.log('switchMap:', v));
  }
}
