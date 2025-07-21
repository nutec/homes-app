import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';  // <-- import this
import { fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HeaderComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should display initial live title from liveTitle$', fakeAsync(() => {
  tick(0);            // advance virtual timer
  fixture.detectChanges(); // update the template with latest observable value
  flushMicrotasks();  // flush any pending microtasks for async pipe

  const compiled = fixture.nativeElement as HTMLElement;
  expect(compiled.querySelector('h1')?.textContent).toContain('Homes App (active for 0 seconds)');
}));



  it('should contain a logo link to home', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link?.getAttribute('ng-reflect-router-link')).toBe('/');
  });
});
