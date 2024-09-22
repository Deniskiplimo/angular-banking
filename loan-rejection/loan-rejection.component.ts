import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-loan-rejection',
  templateUrl: './loan-rejection.component.html',
  styleUrls: ['./loan-rejection.component.css']
})
export class LoanRejectionComponent {
  loanId: string;
  rejectorId: string | undefined;
  reason: string | undefined;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.loanId = this.route.snapshot.paramMap.get('loanId') || '';
  }

  rejectLoan() {
    if (!this.reason || !this.rejectorId) {
      alert('Please provide a reason and rejector ID');
      return;
    }

    this.dataService.rejectLoan(this.loanId, this.rejectorId, this.reason).pipe(
      catchError((error) => {
        console.error('Error rejecting loan:', error);
        alert('Failed to reject loan');
        return of(null); // Handle the error and return a null observable
      })
    ).subscribe((response) => {
      if (response) {
        alert('Loan rejected successfully');
      }
    });
  }
}
