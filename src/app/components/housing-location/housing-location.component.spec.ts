import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HousingLocationComponent } from './housing-location.component';
import { HousingLocation } from '../../types/housing-location';

describe('HousingLocationComponent', () => {
  let component: HousingLocationComponent;
  let fixture: ComponentFixture<HousingLocationComponent>;

  const mockHousingLocation: HousingLocation = {
    id: 1,
    name: 'Test Location',
    city: 'Test City',
    state: 'TS',
    photo: 'https://example.com/photo.jpg',
    availableUnits: 5,
    wifi: true,
    laundry: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, HousingLocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HousingLocationComponent);
    component = fixture.componentInstance;

    // Assign mock input
    component.housingLocation = mockHousingLocation;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
