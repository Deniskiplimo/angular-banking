import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.css']
})
export class TwoFactorAuthComponent {
  twoFaForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.twoFaForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  createApplication() {
    if (this.twoFaForm.invalid) {
      this.errorMessage = 'Application name is required';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const applicationData = { name: this.twoFaForm.value.name };

    this.dataService.createTwoFaApplication(applicationData).pipe(
      catchError(error => {
        this.errorMessage = 'Error creating application';
        this.isLoading = false;
        return of(null);
      })
    ).subscribe((response: any) => {
      this.isLoading = false;
      if (response) {
        this.successMessage = '2FA application created successfully!';
      } else {
        this.errorMessage = 'Unexpected error occurred. Please try again.';
      }
    });
  }

}
