import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-closure',
  templateUrl: './loan-closure.component.html',
  styleUrls: ['./loan-closure.component.css']
})
export class LoanClosureComponent implements OnInit {
  loanId: string;
  loanClosureForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private dataService: DataService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.loanId = this.route.snapshot.paramMap.get('loanId')!;
    this.loanClosureForm = this.fb.group({
      closedBy: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  closeLoan() {
    if (this.loanClosureForm.invalid) {
      this.errorMessage = 'Please provide the ID of the person closing the loan';
      this.successMessage = '';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const closedBy = this.loanClosureForm.value.closedBy;

    this.dataService.closeLoan(this.loanId, closedBy).pipe(
      catchError(error => {
        this.handleError(error);
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response) {
          this.successMessage = 'Loan closed successfully!';
        } else {
          this.errorMessage = 'Unexpected error occurred. Please try again.';
        }
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  // Error handling method
  handleError(error: any) {
    console.error('Error closing loan:', error);
    this.errorMessage = 'Failed to close loan. Please try again later.';
    this.successMessage = '';
    this.isLoading = false;
  }
}
