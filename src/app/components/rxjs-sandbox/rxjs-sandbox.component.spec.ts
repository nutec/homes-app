import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { RxjsSandboxComponent } from './rxjs-sandbox.component';

describe('RxjsSandboxComponent', () => {
  let component: RxjsSandboxComponent;
  let fixture: ComponentFixture<RxjsSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsSandboxComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
