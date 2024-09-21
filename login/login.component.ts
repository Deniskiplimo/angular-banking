import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data1 = "Enter your username or email";
  data2 = "Enter your password";

  constructor(
    private router: Router, 
    private ds: DataService, 
    private fb: FormBuilder
  ) { }

  // Form group for login with validation
  loginForm = this.fb.group({
    usernameOrEmail: ['', [Validators.required, Validators.email]], // Adjust validation for email or username
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // Login function
  login() {
    const usernameOrEmail = this.loginForm.value.usernameOrEmail;
    const password = this.loginForm.value.password;

    if (this.loginForm.valid) {
      this.ds.login(usernameOrEmail, password).subscribe(
        (result: any) => {
          localStorage.setItem("currentUser", result.currentUser);
          localStorage.setItem("token", JSON.stringify(result.token));

          alert(result.message);
          this.router.navigateByUrl("dashboard");
        },
        (result) => {
          alert(result.error.message);
        }
      );
    } else {
      alert('Invalid form');
    }
  }
}
