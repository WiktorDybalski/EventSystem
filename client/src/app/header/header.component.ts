import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;
  userEmail$: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.userEmail$ = this.authService.getUserEmailObservable();
  }

  logout() {
    this.authService.logout();
  }
}

