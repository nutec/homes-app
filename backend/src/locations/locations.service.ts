import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocationsService {
  private readonly locations = this.loadLocations();

  // Load and parse data from db.json
  private loadLocations() {
    const filePath = path.join(__dirname, '../../db.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data).locations;
  }

  // Get all housing locations
  getAllLocations() {
    return this.locations;
  }

  // Get a location by ID
  getLocationById(id: number) {
    return this.locations.find((location) => location.id === id);
  }
}
