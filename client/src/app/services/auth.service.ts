import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8080/api/v1/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userEmail = new BehaviorSubject<string | null>(localStorage.getItem('userEmail'));
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
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

  logout(): void {
    this.removeToken();
    this.loggedIn.next(false);
    this.userEmail.next(null);
    localStorage.removeItem('authToken');
    localStorage.setItem('isLoggedIn', "false");
    localStorage.setItem('userEmail', '');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  private removeToken(): void {
    localStorage.removeItem('authToken');
  }

  getUserEmail(): string | null {
    const token = localStorage.getItem('authToken');
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

