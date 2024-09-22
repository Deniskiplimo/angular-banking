import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent {
  accounts: any[] = [];
  filter: string = 'all';
  errorMessage: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(): void {
    this.dataService.getAccounts(this.filter).subscribe({
      next: (data) => this.accounts = data.accounts,
      error: (error) => this.errorMessage = error.message
    });
  }

  onFilterChange(filter: string) {
    this.filter = filter;
    this.getAccounts();
  }
}


