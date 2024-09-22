import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { ActivatedRoute } from '@angular/router';

interface LoanDetails {
  _id: string;
  amountRequested: number;
  approvedAmount: number;
  status: string;
  purpose: string;
  // Add other relevant fields here
}

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {
  loanId: string = '';
  loanDetails: LoanDetails | null = null; // Initialize as null
  errorMessage: string = '';

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Initialize loanId from route params if available
    this.loanId = this.route.snapshot.paramMap.get('loanId') || '';
    this.getLoanDetails(); // Fetch loan details on init if loanId is set
  }

  getLoanDetails() {
    if (!this.loanId) {
      this.errorMessage = 'Loan ID is required';
      this.loanDetails = null; // Reset loan details on invalid ID
      return;
    }

    this.dataService.getLoanDetails(this.loanId).subscribe({
      next: (data: LoanDetails) => {
        this.loanDetails = data;
        this.errorMessage = '';
      },
      error: (error: any) => {
        console.error('Error fetching loan details:', error);
        this.errorMessage = 'Error fetching loan details. Please try again later.';
        this.loanDetails = null; // Clear loan details on error
      }
    });
  }
}
