import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ClickCounterComponent } from './click-counter.component';

describe('ClickCounterComponent', () => {
  let component: ClickCounterComponent;
  let fixture: ComponentFixture<ClickCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClickCounterComponent],
    });
    fixture = TestBed.createComponent(ClickCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with 0 clicks', fakeAsync(() => {
    component.clickCount$.subscribe((count) => {
      expect(count).toBe(0);
    });
  }));

  it('should count clicks', fakeAsync(() => {
    let result: number[] = [];

    const sub = component.clickCount$.subscribe((count) => result.push(count));

    component.handleClick(); // count = 1
    component.handleClick(); // count = 2

    expect(result).toEqual([0, 1, 2]); // including startWith(0)

    sub.unsubscribe();
  }));

  it('should update DOM when button is clicked', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;

    const button = compiled.querySelector('button')!;
    const display = compiled.querySelector('p')!;

    expect(display.textContent).toContain('0');

    button.click(); // triggers handleClick()
    fixture.detectChanges();

    expect(display.textContent).toContain('1');
  }));
});
