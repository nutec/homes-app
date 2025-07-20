import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, switchMap, map } from 'rxjs';

/**
 * @component
 * @description
 * The `DetailsComponent` displays detailed information about a specific housing location.
 * It retrieves the housing location based on the route parameter `id` and provides a form
 * for users to submit an application with their first name, last name, and email address.
 *
 * The component uses Angular's reactive forms for validation and submission.
 * On initialization, it fetches the housing location data as an observable.
 * The `submitApplication` method handles form submission, validates the form,
 * and sends the application data to the `HousingService`.
 *
 * @example
 * <app-details></app-details>
 *
 * @usageNotes
 * - Requires `HousingService` to provide housing location data and handle application submissions.
 * - Expects the route to contain an `id` parameter for fetching the correct housing location.
 */
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private housingService = inject(HousingService);

  housingLocation$!: Observable<HousingLocation>;

  applyForm = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    this.housingLocation$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.housingService.getHousingLocationById(id))
    );
  }

  submitApplication(event: Event): void {
    event.preventDefault();
    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email } = this.applyForm.value;
    this.housingService.submitApplication(firstName ?? '', lastName ?? '', email ?? '');
  }

  get f() {
    return this.applyForm.controls;
  }
}
