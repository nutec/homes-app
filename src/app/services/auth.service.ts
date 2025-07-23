import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginEndpoint = 'http://localhost:3000/auth/login'; // Backend URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post(this.loginEndpoint, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token'); // Check if token exists
  }

  logout(): void {
    localStorage.removeItem('access_token'); // Remove token
  }

  getLoggedInUsername(): string | null {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null;
    }

    // Decode JWT payload (base64-decoded string between the two dots)
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload?.username || null; // Extract username from the token payload
  }

  getLoggedInRole(): string | null {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null;
    }

    // Decode JWT payload (base64-decoded string between the two dots)
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload?.role || null; // Extract role from the token payload
  }
}
