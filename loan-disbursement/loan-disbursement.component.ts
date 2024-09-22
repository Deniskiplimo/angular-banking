import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loan-disbursement',
  templateUrl: './loan-disbursement.component.html',
  styleUrls: ['./loan-disbursement.component.css']
})
export class LoanDisbursementComponent implements OnInit {
  loanId: string;
  disbursedBy: string = '';
  amount: number | null = null; // Use null to indicate uninitialized

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.loanId = this.route.snapshot.paramMap.get('loanId')!;
  }

  ngOnInit(): void {}

  disburseLoan() {
    // Check for valid inputs
    if (this.amount === null || this.amount <= 0 || !this.disbursedBy) {
      alert('Please provide a valid amount and disbursedBy information');
      return;
    }

    this.dataService.disburseLoan(this.loanId, this.disbursedBy, this.amount).subscribe(
      (response) => {
        alert('Loan disbursed successfully!');
        // Reset form or perform additional actions as needed
        this.resetForm();
      },
      (error) => {
        console.error('Error disbursing loan:', error);
        alert('Failed to disburse loan');
      }
    );
  }

  resetForm() {
    this.amount = null; // Reset the amount
    this.disbursedBy = ''; // Reset the disbursedBy field
  }
}
