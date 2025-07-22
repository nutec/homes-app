import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations') // Base endpoint: /locations
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // GET /locations - Get all locations
  @Get()
  getAllLocations() {
    return this.locationsService.getAllLocations();
  }

  // GET /locations/:id - Get a location by ID
  @Get(':id')
  getLocationById(@Param('id') id: string) {
    const location = this.locationsService.getLocationById(parseInt(id));

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} was not found`);
    }

    return location;
  }
}
