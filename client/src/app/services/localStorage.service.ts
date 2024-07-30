import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
  }
)

export class LocalStorageService {

  private readonly authToken = 'authToken';
  private readonly isLoggedIn = 'isLoggedIn';
  private readonly userEmail = 'userEmail';

  constructor() {}

  setIsLoggedIn(value: boolean): void {
    localStorage.setItem(this.isLoggedIn, value.toString());
  }

  getIsLoggedIn(): boolean {
    const value = localStorage.getItem(this.isLoggedIn);
    return value ? value === 'true' : false;
  }

  removeIsLoggedIn(): void {
    localStorage.removeItem(this.isLoggedIn);
  }

  // userEmail
  setUserEmail(value: string): void {
    localStorage.setItem(this.userEmail, value);
  }

  public getUserEmail(): string {
    return localStorage.getItem(this.userEmail) || '';
  }

  removeUserEmail(): void {
    localStorage.removeItem(this.userEmail);
  }

  // authToken
  setAuthToken(value: string): void {
    localStorage.setItem(this.authToken, value);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authToken);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.authToken);
  }
}


