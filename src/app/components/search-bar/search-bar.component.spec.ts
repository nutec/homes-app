import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { SearchBarComponent } from './search-bar.component';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../types/housing-location';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let housingServiceSpy: jasmine.SpyObj<HousingService>;

  const mockData: HousingLocation[] = [
    {
      id: 1,
      name: 'Location 1',
      city: 'New York',
      state: '',
      photo: '',
      availableUnits: 1,
      wifi: true,
      laundry: true,
    },
    {
      id: 2,
      name: 'Location 2',
      city: 'San Francisco',
      state: '',
      photo: '',
      availableUnits: 2,
      wifi: false,
      laundry: false,
    },
    {
      id: 3,
      name: 'Location 3',
      city: 'Chicago',
      state: '',
      photo: '',
      availableUnits: 3,
      wifi: true,
      laundry: false,
    },
  ];

  beforeEach(() => {
    housingServiceSpy = jasmine.createSpyObj('HousingService', ['getAllHousingLocations']);
    housingServiceSpy.getAllHousingLocations.and.returnValue(of(mockData));

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SearchBarComponent],
      providers: [
        { provide: HousingService, useValue: housingServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit citySelected when a city is selected', () => {
    const citySelectedSpy = spyOn(component.citySelected, 'emit');
    const testCity = 'New York';

    component.selectCity(testCity);

    expect(citySelectedSpy).toHaveBeenCalledOnceWith(testCity);
  });

  it('should filter suggestedCities$ based on user input', fakeAsync(() => {
    let filteredSuggestions: string[] = [];

    component.suggestedCities$.subscribe((cities) => (filteredSuggestions = cities));

    component.searchControl.setValue('San');
    tick(200); // Simulate debounce time

    expect(filteredSuggestions).toEqual(['San Francisco']);
  }));

  it('should navigate suggestions with ArrowUp and ArrowDown', () => {
    const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    const eventUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });

    component.suggestions = ['New York', 'San Francisco', 'Chicago'];

    // Navigate down
    component.onKeyDown(eventDown);
    expect(component.activeIndex).toBe(0);

    component.onKeyDown(eventDown);
    expect(component.activeIndex).toBe(1);

    // Navigate up
    component.onKeyDown(eventUp);
    expect(component.activeIndex).toBe(0);
  });
});
