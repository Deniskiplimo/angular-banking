import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  accountNumber: string = '';
  accountDetails: any;
  errorMessage: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  getAccountDetails(): void {
    this.dataService.getAccountDetails(this.accountNumber).subscribe({
      next: (data) => this.accountDetails = data,
      error: (error) => this.errorMessage = error.message
    });
  }

}
