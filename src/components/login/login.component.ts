import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  private router = inject(Router);
  private http = inject(HttpClient);

  login() {
    const user = { username: this.username, password: this.password };

    this.http
      .post(`${environment.apiBaseURL}/auth/login`, user, { responseType: 'text' })
      .subscribe(
        (response) => {
          if (response === 'Login Successful') {
            localStorage.setItem('username', this.username);
            this.router.navigate(['/game']);
          } else {
            alert(response);
          }
        },
        (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials and try again.');
        }
      );
  }
}
