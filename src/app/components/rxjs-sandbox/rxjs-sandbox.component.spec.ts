import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsSandboxComponent } from './rxjs-sandbox.component';

describe('RxjsSandboxComponent', () => {
  let component: RxjsSandboxComponent;
  let fixture: ComponentFixture<RxjsSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsSandboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
