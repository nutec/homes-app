import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule], // Explicitly import FormsModule
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };

  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    // Call AuthService to authenticate user
    this.authService.login(this.loginData.username, this.loginData.password).subscribe({
      next: (response) => {
        console.log('Login Successful!', response);

        // Save the token in localStorage
        localStorage.setItem('access_token', response.access_token);

        // Navigate to the protected area (e.g., dashboard)
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login Failed', error);
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
}
