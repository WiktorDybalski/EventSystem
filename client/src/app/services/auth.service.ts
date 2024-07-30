import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8080/api/v1/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userEmail = new BehaviorSubject<string | null>(sessionStorage.getItem('userEmail'));
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  private hasToken(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  register(registerRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  authenticate(authRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, authRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  authenticateGoogle(credential: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/oauth2/google`, { token: credential });
  }

  logout(): void {
    this.removeToken();
    this.loggedIn.next(false);
    this.userEmail.next(null);
    sessionStorage.removeItem('authToken');
    sessionStorage.setItem('isLoggedIn', "false");
    sessionStorage.setItem('userEmail', '');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  private removeToken(): void {
    sessionStorage.removeItem('authToken');
  }

  getUserEmail(): string | null {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.sub;
    }
    return null;
  }

  getUserEmailObservable(): Observable<string | null> {
    return this.userEmail.asObservable();
  }

  setUserEmail(email: string | null): void {
    this.userEmail.next(email);
  }
}

