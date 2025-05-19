import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

interface User {
  id: number;
  email: string;
  role: 'admin' | 'operator';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'traffic_jwt';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, {email, password});
  }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserData(): User | null {
    const token = this.getToken();
    return token ? jwtDecode<User>(token) : null;
  }

  isAdmin(): boolean {
    return this.getUserData()?.role === 'admin';
  }
}