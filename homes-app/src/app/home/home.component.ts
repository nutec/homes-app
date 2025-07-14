import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, Observable } from 'rxjs';

/**
 * HomeComponent
 *
 * This component serves as the main landing page for the housing application.
 * It displays a list of housing locations and provides a reactive search input
 * to filter the list by city name.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // Injects the HousingService to fetch housing location data
  private housingService = inject(HousingService);

  /**
   * searchControl
   *
   * Reactive form control for the search input.
   * Tracks the user's search query for filtering housing locations.
   */
  searchControl = new FormControl<string>('', { nonNullable: true });

  /**
   * filteredLocationList$
   *
   * Observable stream of housing locations filtered by the search input.
   * - Starts with an empty string to show all locations initially.
   * - Debounces input to avoid excessive filtering.
   * - Only emits when the search text changes.
   * - Fetches all housing locations and filters them by city name (case-insensitive).
   */
  filteredLocationList$: Observable<HousingLocation[]> = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((searchText) =>
      this.housingService
        .getAllHousingLocations()
        .pipe(
          map((locations) =>
            locations.filter((location) =>
              location.city.toLowerCase().includes((searchText ?? '').toLowerCase().trim())
            )
          )
        )
    )
  );
}
