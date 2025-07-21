import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../../types/housing-location';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
        class="listing-photo"
      />
      <h2 class="listing-heading">
        <a [routerLink]="['/details', housingLocation.id]">{{ housingLocation.name }}</a>
      </h2>
      <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
      <a class="listing-link" [routerLink]="['/details', housingLocation.id]">Learn more</a>
    </section>
  `,
  styleUrls: ['./housing-location.component.css'],
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
