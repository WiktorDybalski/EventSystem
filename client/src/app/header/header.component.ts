import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  userEmail$: Observable<string | null> = new Observable<string | null>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.getIsLoggedIn();
    this.userEmail$ = this.authService.getUserEmail();
  }

  logout(): void {
    this.authService.logout();
  }
}
