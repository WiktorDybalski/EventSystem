import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SessionStorageService {

  private readonly authTokenKey = 'authToken';
  private readonly isLoggedInKey = 'isLoggedIn';
  private readonly userEmailKey = 'userEmail';

  setIsLoggedIn(value: boolean): void {
    sessionStorage.setItem(this.isLoggedInKey, JSON.stringify(value));
  }

  getIsLoggedIn(): boolean {
    const value = sessionStorage.getItem(this.isLoggedInKey);
    return value ? JSON.parse(value) : false;
  }

  setUserEmail(value: string): void {
    sessionStorage.setItem(this.userEmailKey, value);
  }

  getUserEmail(): string | null {
    return sessionStorage.getItem(this.userEmailKey);
  }

  setAuthToken(value: string): void {
    sessionStorage.setItem(this.authTokenKey, value);
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem(this.authTokenKey);
  }

  setLogoutVariables(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.setItem('isLoggedIn', "false");
    sessionStorage.setItem('userEmail', '');
  }
}
