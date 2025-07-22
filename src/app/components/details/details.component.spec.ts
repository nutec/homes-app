import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DetailsComponent } from './details.component';
import { HousingService } from '../../services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../../types/housing-location';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let housingServiceSpy: jasmine.SpyObj<HousingService>;

  const mockLocation: HousingLocation = {
    id: 1,
    name: 'Test Housing',
    city: 'Test City',
    state: 'Test State',
    photo: '',
    availableUnits: 3,
    wifi: true,
    laundry: false,
  };

  beforeEach(async () => {
    housingServiceSpy = jasmine.createSpyObj('HousingService', [
      'getHousingLocationById',
      'submitApplication',
    ]);
    housingServiceSpy.getHousingLocationById.and.returnValue(of(mockLocation));

    await TestBed.configureTestingModule({
    imports: [DetailsComponent, RouterTestingModule],
    providers: [
        { provide: HousingService, useValue: housingServiceSpy },
        {
            provide: ActivatedRoute,
            useValue: {
                paramMap: of({
                    get: (key: string) => (key === 'id' ? '1' : null),
                }),
            },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit application when form is valid', () => {
    component.applyForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    });

    const event = new Event('submit');
    component.submitApplication(event);

    expect(housingServiceSpy.submitApplication).toHaveBeenCalledOnceWith(
      'John',
      'Doe',
      'john@example.com'
    );
  });

  it('should not submit application when form is invalid', () => {
    component.applyForm.setValue({
      firstName: '',
      lastName: '',
      email: '', // required + invalid
    });

    const event = new Event('submit');
    component.submitApplication(event);

    expect(housingServiceSpy.submitApplication).not.toHaveBeenCalled();
  });

  it('should handle undefined values gracefully in submitApplication', () => {
    // Clear validators to isolate the test to branch coverage
    for (const control of Object.values(component.applyForm.controls)) {
      control.clearValidators();
      control.updateValueAndValidity();
    }

    // Use patchValue instead of setValue to allow undefined
    component.applyForm.patchValue({
      firstName: undefined,
      lastName: undefined,
      email: undefined,
    });

    const event = new Event('submit');
    component.submitApplication(event);

    expect(housingServiceSpy.submitApplication).toHaveBeenCalledOnceWith('', '', '');
  });
});
