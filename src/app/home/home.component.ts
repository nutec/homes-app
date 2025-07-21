import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <input [formControl]="searchControl" placeholder="Search by city" />
    <ul>
      <li *ngFor="let location of filteredLocationList$ | async">
        {{ location.name }} – {{ location.city }}
      </li>
    </ul>
  `,
})
export class HomeComponent {
  private housingService = inject(HousingService);
  private route = inject(ActivatedRoute);

  housingLocationList$ = this.housingService.getAllHousingLocations();
  searchControl = new FormControl('');

  filteredLocationList$ = combineLatest([
    this.housingLocationList$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([locations, searchText]) => {
      const normalizedSearch = this.normalize(searchText);
      if (!normalizedSearch) return locations;

      return locations.filter((location) =>
        this.normalize(location.city).includes(normalizedSearch)
      );
    })
  );

  onSearchChanged(text: string): void {
    this.searchControl.setValue(text);
  }

  onCitySelected(city: string): void {
    this.searchControl.setValue(city);
  }

  private normalize(value: string | null | undefined): string {
    return (value ?? '')
      .trim()
      .replace(/\s+/g, ' ') // collapse multiple spaces
      .toLowerCase();
  }
}
