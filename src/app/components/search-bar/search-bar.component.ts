import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, Observable } from 'rxjs';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  // Form control and UI state
  searchControl = new FormControl<string>('', { nonNullable: true });
  isSearchFocused = false;

  // Outputs for parent component communication
  @Output() searchChanged = new EventEmitter<string>();
  @Output() citySelected = new EventEmitter<string>();

  // Keyboard navigation state
  activeIndex = -1;
  suggestions: string[] = [];

  // Observable for suggested cities, updated as input changes
  suggestedCities$: Observable<string[]> = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((searchText) =>
      this.housingService.getAllHousingLocations().pipe(
        map((locations) => {
          const input = searchText.toLowerCase().trim();
          const cities = locations.map((loc) => loc.city);
          return [...new Set(cities)].filter((city) => city.toLowerCase().includes(input));
        })
      )
    )
  );

  // Constructor subscribes to value changes to emit upward and update suggestions list
  constructor(private housingService: HousingService) {
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(200), distinctUntilChanged())
      .subscribe((value) => {
        this.searchChanged.emit(value);
      });

    // Subscribe to suggested cities to update internal suggestions list and reset active index
    this.suggestedCities$.subscribe((cities) => {
      this.suggestions = cities;
      this.activeIndex = -1;
    });
  }

  // Getter for convenience
  get searchValue(): string {
    return this.searchControl.value ?? '';
  }

  // Focus and blur handlers
  onBlur() {
    // Delay hiding suggestions to allow clicks on suggestion items
    setTimeout(() => (this.isSearchFocused = false), 200);
  }

  // When user selects a city (by click or keyboard)
  selectCity(city: string) {
    this.searchControl.setValue(city);
    this.citySelected.emit(city);
    this.isSearchFocused = false;
  }

  // Keyboard navigation handler
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
