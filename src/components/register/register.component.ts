import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router,RouterModule } from '@angular/router';  
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  private router = inject(Router);
  private http = inject(HttpClient);

 
  register() {
    console.log("Register button clicked");

    this.username = this.username.trim();
    this.password = this.password.trim();
  
    if (!this.username || !this.password) {
      alert("Username and Password cannot be empty!");
      return;
    }
  
    const newUser = {
      username: this.username,
      password: this.password
    };
  
    console.log("Register method executed with data:", newUser);
  
    this.http.post(
      `${environment.apiBaseURL}/auth/register`,
      newUser,
      { responseType: 'text' }
    ).subscribe({
      next: (response) => {
        console.log("Response received:", response);
        if (response === "Congratulations, You have been successfully registered") {
          alert('Congratulations, You have been successfully registered! Please login.');
          this.router.navigate(['/login']);
        } else {
          alert(response);
        }
      },
      error: (error) => {
        console.error("Error during registration:", error);
        alert(error.error || "Registration failed. Please try again.");
      }
    });
  }
}
