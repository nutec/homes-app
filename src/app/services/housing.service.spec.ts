import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { HousingService } from './housing.service';
import { HousingLocation } from '../types/housing-location';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HousingService', () => {
  let service: HousingService;
  let httpMock: HttpTestingController;

  const mockLocations: HousingLocation[] = [
    {
      id: 1,
      name: 'Test House 1',
      city: 'City A',
      state: 'State A',
      photo: 'photo.jpg',
      availableUnits: 1,
      wifi: true,
      laundry: false,
    },
    {
      id: 2,
      name: 'Test House 2',
      city: 'City B',
      state: 'State B',
      photo: 'photo2.jpg',
      availableUnits: 2,
      wifi: false,
      laundry: true,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [HousingService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(HousingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all housing locations', () => {
    service.getAllHousingLocations().subscribe((locations) => {
      expect(locations.length).toBe(2);
      expect(locations).toEqual(mockLocations);
    });

    const req = httpMock.expectOne('http://localhost:3000/locations');
    expect(req.request.method).toBe('GET');
    req.flush(mockLocations);
  });

  it('should fetch a single housing location by ID', () => {
    const id = 1;
    service.getHousingLocationById(id).subscribe((location) => {
      expect(location).toEqual(mockLocations[0]);
    });

    const req = httpMock.expectOne(`http://localhost:3000/locations/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLocations[0]);
  });

  it('should log to console when submitting application', () => {
    const consoleSpy = spyOn(console, 'log');
    service.submitApplication('Jane', 'Doe', 'jane@example.com');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Application submitted by Jane Doe with email jane@example.com'
    );
  });
});
