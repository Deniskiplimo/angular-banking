import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  private getToken(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem("token") || "null");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Create 2FA Application
  createTwoFaApplication(data: { name: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/2fa/application`, data, { headers: this.getToken() });
  }

  // User Registration
  register(acno: string, uname: string, psw: string): Observable<any> {
    const data = { acno, uname, psw };
    return this.http.post<any>(`${this.apiUrl}/api/register`, data);
  }

  // User Login with error handling
  login(acno: string, psw: string): Observable<any> {
    const data = { acno, psw };
    console.log('Sending login request with:', data); // Log the data being sent

    return this.http.post<any>(`${this.apiUrl}/api/login`, data).pipe(
      tap(response => {
        console.log('Login response received:', response); // Log the response
      }),
      catchError(err => {
        console.error('Login error:', err); // Log the error
        return throwError(err); // Rethrow the error
      })
    );
  }

  // Deposit Funds
  deposit(accountNumber: string, amount: number, phoneNumber: string, isMpesa: boolean): Observable<any> {
    const body = { accountNumber, amount, phoneNumber, isMpesa };
    return this.http.post<any>(`${this.apiUrl}/accounts/deposit`, body, { headers: this.getToken() });
  }

  // Withdraw Funds
  withdraw(accountNumber: string, amount: number, phoneNumber: string): Observable<any> {
    const body = { accountNumber, amount, phoneNumber };
    return this.http.post<any>(`${this.apiUrl}/accounts/withdraw`, body, { headers: this.getToken() });
  }

  // Transfer Funds
  transfer(fromAccountNumber: string, toAccountNumber: string, amount: number, details: string, phoneNumber: string): Observable<any> {
    const body = { fromAccountNumber, toAccountNumber, amount, details, phoneNumber };
    return this.http.post<any>(`${this.apiUrl}/accounts/transfer`, body, { headers: this.getToken() });
  }

  // Get Account Transactions
  getTransaction(acno: string): Observable<any> {
    const data = { acno };
    return this.http.post<any>(`${this.apiUrl}/accounts/getTransaction`, data, { headers: this.getToken() });
  }

  // Delete Account
  deleteAcc(acno: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/accounts/deleteacc/${acno}`, { headers: this.getToken() });
  }

  // Get all accounts with filters
  getAccounts(filter: string = 'all'): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/accounts?filter=${filter}`, { headers: this.getToken() });
  }

  // Get account balance by userId
  getAccountBalance(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/accounts/${userId}/balance`, { headers: this.getToken() });
  }

  // Get account details by account number
  getAccountDetails(accountNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/accounts/${accountNumber}`, { headers: this.getToken() });
  }

  // Apply for Loan
  applyForLoan(loanData: { userId: string; amountRequested: number; purpose: string; term: number; interestRate: number; }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/loan/apply`, loanData, { headers: this.getToken() });
  }

  // Approve Loan
  approveLoan(loanId: string, approvedAmount: number, approverId: string): Observable<any> {
    const body = { approvedAmount, approverId };
    return this.http.post<any>(`${this.apiUrl}/loan/approve/${loanId}`, body, { headers: this.getToken() });
  }

  // Loan Disbursement
  disburseLoan(loanId: string, disbursedBy: string, amount: number): Observable<any> {
    const body = { disbursedBy, amount };
    return this.http.post<any>(`${this.apiUrl}/loan/disburse/${loanId}`, body, { headers: this.getToken() });
  }

  // Loan Rejection
  rejectLoan(loanId: string, rejectorId: string, reason: string): Observable<any> {
    const body = { rejectorId, reason };
    return this.http.post<any>(`${this.apiUrl}/loan/reject/${loanId}`, body, { headers: this.getToken() });
  }

  // Loan Closure
  closeLoan(loanId: string, closedBy: string): Observable<any> {
    const body = { closedBy };
    return this.http.post<any>(`${this.apiUrl}/loan/close/${loanId}`, body, { headers: this.getToken() });
  }

  // Account Statement API
  getAccountStatement(accountNumber: string, startDate: string, endDate: string, format: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/accounts/${accountNumber}/statement`, { 
      params: { startDate, endDate, format }, 
      headers: this.getToken() 
    });
  }

  // Fetch Transactions API
  getTransactions(accountId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/transactions/${accountId}`, { headers: this.getToken() });
  }

  // Booking APIs
  bookRoom(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookRoom`, bookingData, { headers: this.getToken() });
  }

  bookUber(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookUber`, bookingData, { headers: this.getToken() });
  }

  bookMeal(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookMeal`, bookingData, { headers: this.getToken() });
  }

  getBookings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bookings`, { headers: this.getToken() });
  }

  // Get Loan Details
  getLoanDetails(loanId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/loan/${loanId}`, { headers: this.getToken() });
  }
}
