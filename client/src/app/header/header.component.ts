import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink
  ],
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
