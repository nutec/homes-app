import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HousingLocationComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private housingService = inject(HousingService);
  private currentSearch = '';

  filteredLocationList$: Observable<HousingLocation[]> = this.housingService
    .getAllHousingLocations()
    .pipe(
      map((locations) =>
        locations.filter((location) =>
          location.city.toLowerCase().includes(this.currentSearch.toLowerCase().trim())
        )
      )
    );

  onSearchChanged(query: string) {
    this.currentSearch = query;
    this.filteredLocationList$ = this.housingService
      .getAllHousingLocations()
      .pipe(
        map((locations) =>
          locations.filter((location) =>
            location.city.toLowerCase().includes(query.toLowerCase().trim())
          )
        )
      );
  }

  onCitySelected(city: string) {
    this.onSearchChanged(city);
  }
}
