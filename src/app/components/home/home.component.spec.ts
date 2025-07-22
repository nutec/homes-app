import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { HomeComponent } from './home.component';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../types/housing-location';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
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

    // Mock ActivatedRoute
    const queryParamsSubject = new BehaviorSubject({});
    const activatedRouteMock = {
      queryParams: queryParamsSubject.asObservable(),
      snapshot: {
        queryParams: {},
        paramMap: {
          get: () => null,
        },
      },
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HomeComponent],
      providers: [
        { provide: HousingService, useValue: housingServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter housing locations by city name', (done) => {
    component.onSearchChanged('New');
    component.filteredLocationList$.subscribe((locations) => {
      expect(locations.length).toBe(1);
      expect(locations[0].city).toBe('New York');
      done();
    });
  });

  it('should return no results if no city matches the query', (done) => {
    component.onSearchChanged('NonExistingCity');
    component.filteredLocationList$.subscribe((locations) => {
      expect(locations.length).toBe(0);
      done();
    });
  });

  it('should return all locations if the search query is empty', (done) => {
    component.onSearchChanged('');
    component.filteredLocationList$.subscribe((locations) => {
      expect(locations.length).toBe(3);
      done();
    });
  });

  it('should update filtered results when calling onCitySelected', (done) => {
    component.onCitySelected('Chicago');
    component.filteredLocationList$.subscribe((locations) => {
      expect(locations.length).toBe(1);
      expect(locations[0].city).toBe('Chicago');
      done();
    });
  });

  it('should handle case-insensitive search queries', (done) => {
    component.onSearchChanged('new york');
    component.filteredLocationList$.subscribe((locations) => {
      expect(locations.length).toBe(1);
      expect(locations[0].city).toBe('New York');
      done();
    });
  });
});
