import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Use 'of' to return an observable when handling errors

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent {
  userId: string = '';
  amountRequested: number | null = null;
  purpose: string = 'home';
  term: number | null = null;
  interestRate: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false; // Track the loading state

  constructor(private dataService: DataService) {}

  applyForLoan() {
    // Basic form validation
    if (!this.userId || !this.amountRequested || !this.purpose || !this.term || !this.interestRate) {
      this.errorMessage = 'All fields are required';
      this.successMessage = '';
      return;
    }

    const loanData = {
      userId: this.userId,
      amountRequested: this.amountRequested,
      purpose: this.purpose,
      term: this.term,
      interestRate: this.interestRate
    };

    this.isLoading = true; // Set loading state to true

    this.dataService.applyForLoan(loanData).pipe(
      catchError(error => {
        this.handleError(error);  // Handle errors
        this.isLoading = false;   // Reset loading state
        return of(null); // Return an observable with null on error
      })
    ).subscribe({
      next: (response: any) => {
        if (response) { // Ensure response is not null
          this.successMessage = 'Loan application submitted successfully';
          this.errorMessage = '';
        }
        this.isLoading = false;  // Reset loading state
      },
      error: () => {
        this.isLoading = false;   // Reset loading state
      }
    });
  }

  // Error handling method
  handleError(error: any) {
    if (error.status === 400) {
      this.errorMessage = 'Bad request. Please check your input data.';
    } else if (error.status === 401) {
      this.errorMessage = 'Unauthorized. Please log in again.';
    } else if (error.status === 500) {
      this.errorMessage = 'Internal server error. Please try again later.';
    } else {
      this.errorMessage = 'An unexpected error occurred. Please try again.';
    }
    this.successMessage = ''; // Clear success message
  }
}
