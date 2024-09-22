import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Use 'of' to return an observable when handling errors

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent {
  accountNumber: string = ''; // Initialize as an empty string
  startDate: string = ''; // Initialize as an empty string
  endDate: string = ''; // Initialize as an empty string
  format: string = 'pdf';
  statement: any;

  constructor(private dataService: DataService) {}

  fetchStatement() {
    if (this.accountNumber && this.startDate && this.endDate) { // Check if values are provided
      this.dataService.getAccountStatement(this.accountNumber, this.startDate, this.endDate, this.format)
        .subscribe(data => {
          this.statement = data;
        }, error => {
          console.error('Error fetching statement:', error);
        });
    } else {
      console.error('Please provide all required fields: account number, start date, and end date.');
    }
  }
}
