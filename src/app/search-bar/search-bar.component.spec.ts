import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { SearchBarComponent } from './search-bar.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

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
      providers: [{ provide: HousingService, useValue: housingServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger Angular lifecycle hooks
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchChanged when searchControl value changes', (done) => {
    // Subscribe to searchChanged emitter
    component.searchChanged.subscribe((value) => {
      expect(value).toBe('San');
      done();
    });

    // Simulate user input
    component.searchControl.setValue('San');
  });

  it('should emit citySelected when a city is selected', (done) => {
    const testCity = 'New York';

    // Subscribe to citySelected emitter
    component.citySelected.subscribe((city) => {
      expect(city).toBe(testCity);
      done();
    });

    // Simulate city selection
    component.selectCity(testCity);
  });

  it('should generate suggestedCities$ based on input', (done) => {
    component.suggestedCities$.subscribe((cities) => {
      expect(cities).toContain('New York');
      expect(cities).toContain('Chicago');
      expect(cities.length).toBe(3); // All unique cities from mockData
      done();
    });

    // Simulate user input
    component.searchControl.setValue(''); // Empty search should return all suggestions
  });

  it('should navigate suggestions with ArrowUp and ArrowDown', () => {
    const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    const eventUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });

    component.suggestions = ['New York', 'San Francisco', 'Chicago'];

    // Simulate ArrowDown input
    component.onKeyDown(eventDown);
    expect(component.activeIndex).toBe(0);

    component.onKeyDown(eventDown);
    expect(component.activeIndex).toBe(1);

    // Simulate ArrowUp input
    component.onKeyDown(eventUp);
    expect(component.activeIndex).toBe(0);
  });
});
