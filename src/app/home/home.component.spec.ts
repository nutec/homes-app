import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subscription } from 'rxjs';

import { HomeComponent } from './home.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

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

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HomeComponent],
      providers: [{ provide: HousingService, useValue: housingServiceSpy }],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function runFilteredTest(searchValue: string | null, expectedCount: number) {
    return fakeAsync(() => {
      const sub: Subscription = component.filteredLocationList$.subscribe((filtered) => {
        expect(filtered.length).toBe(expectedCount);
        sub.unsubscribe(); // cleanup
      });

      component.searchControl.setValue(searchValue as any);
      tick(301); // simulate debounce
    });
  }

  it('should filter housing locations by matching city name', runFilteredTest('New', 1));

  it('should return empty list when no city matches searchText', runFilteredTest('London', 0));

  it('should handle null searchText safely (?? fallback)', runFilteredTest(null, 3));

  it('should return all housing locations on initial load (startWith empty)', fakeAsync(() => {
    let sub = component.filteredLocationList$.subscribe((filtered) => {
      expect(filtered.length).toBe(3);
      sub.unsubscribe();
    });

    tick(301);
  }));
});
