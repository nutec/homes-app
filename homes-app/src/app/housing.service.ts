import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url= 'http://localhost:3000/locations';


  constructor() { }

  async getAllHousingLocations() : Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? [];
  }

  submitApplication(firstName: string, lastName: string, email: string): void {
    console.log(`Application submitted by ${firstName} ${lastName} with email ${email}`);
    // Here you would typically send the application to a server or save it in some way
  }
}
