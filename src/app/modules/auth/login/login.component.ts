import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.credentials.email, this.credentials.password).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Credenciales incorrectas';
      }
    });
  }
}