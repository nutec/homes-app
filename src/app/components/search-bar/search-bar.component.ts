import { Component, EventEmitter, Output, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, Observable } from 'rxjs';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchControl = new FormControl<string>('', { nonNullable: true });
  isSearchFocused = false;

  @Output() searchChanged = new EventEmitter<string>();
  @Output() citySelected = new EventEmitter<string>();

  activeIndex = -1;
  suggestions: string[] = []; // Used for keyboard navigation

  suggestedCities$: Observable<string[]> = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((searchText: string) =>
      this.housingService.getAllHousingLocations().pipe(
        map((locations: { city: string }[]) => {
          const input = searchText.toLowerCase().trim();
          const cities = locations.map((loc) => loc.city);
          return [...new Set(cities)].filter((city) => city.toLowerCase().includes(input));
        })
      )
    )
  );

  housingService = inject(HousingService);

  get searchValue(): string {
    return this.searchControl.value ?? '';
  }

  onBlur() {
    setTimeout(() => (this.isSearchFocused = false), 200);
  }

  selectCity(city: string) {
    this.searchControl.setValue(city);
    this.citySelected.emit(city);
    this.isSearchFocused = false;
  }

  onKeyDown(event: KeyboardEvent) {
    const max = this.suggestions.length - 1;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = this.activeIndex < max ? this.activeIndex + 1 : 0;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : max;
    } else if (event.key === 'Enter' && this.activeIndex >= 0) {
      event.preventDefault();
      const selected = this.suggestions[this.activeIndex];
      if (selected) {
        this.selectCity(selected);
      }
    }
  }
}
