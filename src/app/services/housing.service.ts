import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HousingLocation } from '../types/housing-location';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private http = inject(HttpClient); // Streamlined DI with inject()

  private readonly url = 'http://localhost:3000/locations'; // Base URL for housing locations

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.url);
  }

  getHousingLocationById(id: number): Observable<HousingLocation> {
    return this.http.get<HousingLocation>(`${this.url}/${id}`);
  }

  submitApplication(firstName: string, lastName: string, email: string): void {
    console.log(`Application submitted by ${firstName} ${lastName} with email ${email}`);
    // Mock: Implement actual server communication logic here
  }
}
