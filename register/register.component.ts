import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Define properties for placeholders
  d1 = "Enter username";
  d2 = "Enter email";
  d3 = "Enter password";

  // Define the register form
  registerForm1: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.registerForm1 = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.registerForm1.valid) {
      const formData = this.registerForm1.value;
      const requestBody = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      this.http.post('/api/register', requestBody).subscribe({
        next: (result: any) => {
          alert(result.message);
          this.router.navigateByUrl(""); // Redirect after successful registration
        },
        error: (error) => {
          alert(error.error.message); // Show error message
        }
      });
    } else {
      alert("Invalid form");
    }
  }
}
