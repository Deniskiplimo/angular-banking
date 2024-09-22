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
    usernameOrEmail: ['', [Validators.required]], // Removed email validation for flexibility
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // Login function
  login() {
    const usernameOrEmail = this.loginForm.value.usernameOrEmail!;
    const password = this.loginForm.value.password!;

    console.log('Attempting to log in with:', usernameOrEmail, password);

    if (this.loginForm.valid) {
      this.ds.login(usernameOrEmail, password).subscribe(
        (result: any) => {
          console.log('Login result:', result);
          // Check if login was successful
          if (result.accessToken) { // Change to check for accessToken
            localStorage.setItem("currentUser", result.currentUser || "Guest"); // Default to "Guest" if no username
            localStorage.setItem("token", result.accessToken); // Save access token

            console.log('Login successful, navigating to dashboard');
            this.router.navigateByUrl("dashboard");
          } else {
            console.error('Login failed: ', result.message || 'Unknown error'); // Log error message
            alert(result.message || 'Login failed'); // Show error message from the server
          }
        },
        (error) => {
          // Log specific error details based on status code or message
          if (error.status === 401) {
            console.error('Unauthorized: Invalid username or password');
          } else if (error.status === 404) {
            console.error('Error: API endpoint not found');
          } else {
            console.error('Login error:', error);
          }
          
          alert(error.error.message || "Login failed, please try again."); // General error handling
        }
      );
    } else {
      console.warn('Invalid form submission:', this.loginForm.errors);
      alert('Invalid form'); // Alert if form is invalid
    }
  }
}
