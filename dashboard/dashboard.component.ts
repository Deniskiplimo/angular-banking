import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  acno: any;
  user: any;
  sDetails: any;

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    // Access data from local storage
    this.user = localStorage.getItem("currentUser");
    this.sDetails = new Date();
  }

  ngOnInit(): void {
    if (!localStorage.getItem("currentAcno")) {
      alert("Please login");
      this.router.navigateByUrl("");
    }
  }

  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
    amnt: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    isMpesa: [false] // isMpesa boolean control
  });

  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw1: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
    amnt1: ['', [Validators.required, Validators.pattern('[0-9]+')]]
  });

  deposit() {
    var acno = this.depositForm.value.acno!;
    var psw = this.depositForm.value.psw!;
    var amnt = this.depositForm.value.amnt!;
    var isMpesa = this.depositForm.value.isMpesa ?? false; // Ensure isMpesa is always a boolean

    if (this.depositForm.valid) {
      this.ds.deposit(acno, Number(amnt), psw, isMpesa).subscribe(
        (result: any) => {
          alert(result.message);
          this.clearForm();
        },
        error => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Invalid form');
    }
  }

  withdraw() {
    var acno = this.withdrawForm.value.acno1!;
    var psw = this.withdrawForm.value.psw1!;
    var amnt = this.withdrawForm.value.amnt1!;

    if (this.withdrawForm.valid) {
      this.ds.withdraw(acno, Number(amnt), psw).subscribe(
        (result: any) => {
          alert(result.message);
          this.clearForm();
        },
        error => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Invalid form');
    }
  }

  clearForm() {
    this.depositForm.reset();
    this.withdrawForm.reset();
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentAcno");
    this.router.navigateByUrl("");
  }

  deleteAcc() {
    this.acno = JSON.parse(localStorage.getItem("currentAcno") || "");
  }

  cancelChild() {
    this.acno = "";
  }

  onDeleteAcc(event: any) {
    this.ds.deleteAcc(event).subscribe((result: any) => {
      alert(result.message);
      this.logout();
    });
  }
}
