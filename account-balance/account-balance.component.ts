import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.css']
})
export class AccountBalanceComponent {
  userId: string = '';
  balance: number | null = null;
  errorMessage: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  getBalance(): void {
    this.dataService.getAccountBalance(this.userId).subscribe({
      next: (data) => this.balance = data.balance,
      error: (error) => this.errorMessage = error.message
    });
  }

}
