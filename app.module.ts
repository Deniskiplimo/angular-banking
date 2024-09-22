import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomecardComponent } from './homecard/homecard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { RegistercardComponent } from './registercard/registercard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DeleteComponent } from './delete/delete.component';
import {HttpClientModule} from '@angular/common/http';
import { LoanApprovalComponent } from './loan-approval/loan-approval.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { LoanApplicationComponent } from './loan-application/loan-application.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { AccountListComponent } from './account-list/account-list.component';
import { LoanDisbursementComponent } from './loan-disbursement/loan-disbursement.component';
import { LoanRejectionComponent } from './loan-rejection/loan-rejection.component';
import { TwoFactorAuthComponent } from './two-factor-auth/two-factor-auth.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { BookingManagementComponent } from './booking-management/booking-management.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomecardComponent,
    DashboardComponent,
    RegisterComponent,
    RegistercardComponent,
    TransactionComponent,
    DeleteComponent,
    LoanApprovalComponent,
    LoanDetailsComponent,
    LoanApplicationComponent,
    AccountDetailsComponent,
    AccountBalanceComponent,
    AccountListComponent,
    LoanDisbursementComponent,
    LoanRejectionComponent,
    TwoFactorAuthComponent,
    AccountStatementComponent,
    BookingManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
