import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from "@angular/router";
import {JwtHelperService} from '@auth0/angular-jwt';
import {SessionStorageService} from './sessionStorage.service';
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8080/api/v1/auth';
  private loggedInSubject: BehaviorSubject<boolean>;
  private userEmailSubject: BehaviorSubject<string | null>;
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private notificationService: NotificationService
  ) {
    const isLoggedIn = this.sessionStorageService.getIsLoggedIn();
    const userEmail = this.getEmailFromToken();

    this.loggedInSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.userEmailSubject = new BehaviorSubject<string | null>(userEmail);
  }

  getEmailFromToken(): string {
    const token = this.sessionStorageService.getAuthToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken ? decodedToken.sub : null;
    }
    return '';
  }

  private hasToken(): boolean {
    return !!this.sessionStorageService.getAuthToken();
  }

  setAuthToken(token: string): void {
    this.sessionStorageService.setAuthToken(token);
  }

  public setLoggedIn(value: boolean): void {
    this.sessionStorageService.setIsLoggedIn(value);
    this.loggedInSubject.next(value);
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  getUserEmail(): Observable<string | null> {
    return this.userEmailSubject.asObservable();
  }

  setUserEmail(value: string): void {
    this.sessionStorageService.setUserEmail(value);
    this.userEmailSubject.next(value);
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
    return this.http.post<any>(`${this.apiUrl}/oauth2/google`, {token: credential});
  }

  logout(): void {
    this.sessionStorageService.setLogoutVariables();
    this.loggedInSubject.next(false);
    this.userEmailSubject.next(null);
    this.notificationService.showNotification('Logout successfully', 'success');
    this.router.navigate(['/login']);
  }
}


