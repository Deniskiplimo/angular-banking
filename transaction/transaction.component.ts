import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  transactionArray: any[] = []; // Initialize as an empty array
  accountNumber: string = '';
  amount: number | null = null; // Initialize as null
  phoneNumber: string = ''; // Ensure phoneNumber is a string
  isMpesa: boolean = false; // Initialize as false
  toAccountNumber: string = '';
  details: string = '';
  accountId: string = ''; // Initialize as empty string
  transactions: any[] = []; // Initialize as empty array

  constructor(private ds: DataService) {
    this.loadTransactions();
  }

  loadTransactions() {
    const currentAcno = JSON.parse(localStorage.getItem("currentAcno") || "null");
    if (currentAcno) {
      this.ds.getTransaction(currentAcno).subscribe(
        (result: any) => {
          this.transactionArray = result.transaction;
          console.log(this.transactionArray);
        },
        (error) => {
          console.error('Error loading transactions:', error);
        }
      );
    } else {
      console.error('No account number found in local storage.');
    }
  }

  deposit() {
    if (this.amount !== null) { // Ensure amount is not null
      this.ds.deposit(this.accountNumber, Number(this.amount), this.phoneNumber, this.isMpesa)
        .subscribe((response: any) => {
          console.log('Deposit Response:', response);
          this.loadTransactions(); // Reload transactions after deposit
        }, (error: any) => {
          console.error('Deposit Error:', error);
        });
    } else {
      console.error('Amount is required for deposit.');
    }
  }

  withdraw() {
    if (this.amount !== null) { // Ensure amount is not null
      this.ds.withdraw(this.accountNumber, Number(this.amount), this.phoneNumber)
        .subscribe((response: any) => {
          console.log('Withdrawal Response:', response);
          this.loadTransactions(); // Reload transactions after withdrawal
        }, (error: any) => {
          console.error('Withdrawal Error:', error);
        });
    } else {
      console.error('Amount is required for withdrawal.');
    }
  }

  transfer() {
    if (this.amount !== null) { // Ensure amount is not null
      this.ds.transfer(this.accountNumber, this.toAccountNumber, Number(this.amount), this.details, this.phoneNumber)
        .subscribe((response: any) => {
          console.log('Transfer Response:', response);
          this.loadTransactions(); // Reload transactions after transfer
        }, (error: any) => {
          console.error('Transfer Error:', error);
        });
    } else {
      console.error('Amount is required for transfer.');
    }
  }

  fetchTransactions() {
    this.ds.getTransactions(this.accountId)
      .subscribe(data => {
        this.transactions = data.transactions;
      }, error => {
        console.error('Error fetching transactions:', error);
      });
  }
}
