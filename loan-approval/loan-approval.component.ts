import { Component } from '@angular/core';

import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-loan-approval',
  templateUrl: './loan-approval.component.html',
  styleUrls: ['./loan-approval.component.css']
})
export class LoanApprovalComponent {
  loanId: string = '';
  approvedAmount: number | null = null;
  approverId: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private dataService: DataService) {}

  approveLoan() {
    if (!this.loanId || !this.approvedAmount || !this.approverId) {
      this.errorMessage = 'All fields are required';
      return;
    }

    this.dataService.approveLoan(this.loanId, this.approvedAmount, this.approverId).subscribe({
      next: (response: any) => {
        this.successMessage = 'Loan approved successfully';
        this.errorMessage = '';
      },
      error: (error: any) => {
        this.errorMessage = 'Error approving loan';
        this.successMessage = '';
      }
    });
  }

}
