import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Photo of {{ housingLocation?.name }}" />
      <section class="listing-description">
        <h2 class="listing-heading">
          {{ housingLocation?.name }}
        </h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does location have laundry: {{ housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication($event)">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" formControlName="firstName" placeholder="First Name" />
          <div *ngIf="firstName?.invalid && applyForm.controls['firstName'].touched" class="error">
            First name is required.
          </div>

          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" formControlName="lastName" placeholder="Last Name" />
          <div *ngIf="lastName?.invalid && applyForm.controls['lastName'].touched" class="error">
            Last name is required.
          </div>

          <label for="email">Email</label>
          <input type="text" id="email" formControlName="email" placeholder="E-mail" />
          <div *ngIf="emailAdr?.invalid && applyForm.controls['email'].touched" class="error">
            Please enter a valid email.
          </div>
          <button class="primary" type="submit">Apply now!</button>
        </form>
        
      </section>
  </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm: FormGroup = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] })
  });

  ngOnInit() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation: HousingLocation | undefined) => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication(event: Event) {
  event.preventDefault();
  if (this.applyForm.invalid) {
    this.applyForm.markAllAsTouched();
    return;
  }
  this.housingService.submitApplication(
    this.applyForm.value.firstName ?? '',
    this.applyForm.value.lastName ?? '',
    this.applyForm.value.email ?? ''
  );
}

  keyUpHandler() {
    console.log('Key up event triggered');
  }

  get firstName() {
    return this.applyForm.get('firstName');
  }

  get lastName() {
    return this.applyForm.get('lastName');
  }

  get emailAdr() {
    return this.applyForm.get('email');
  }
}
