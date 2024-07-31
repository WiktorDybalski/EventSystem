import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {ChatIconComponent} from "./chat-icon/chat-icon.component";
import {ChatWindowComponent} from "./chat-window/chat-window.component";
import {NotificationComponent} from "./notification/notification.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "./services/auth.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ChatIconComponent, ChatWindowComponent, NotificationComponent, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Event Ticketing System';
  isLoggedIn$: Observable<boolean> = of(false);
  userEmail$: Observable<string | null> = of(null);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.getIsLoggedIn();
    this.userEmail$ = this.authService.getUserEmail();
  }
}
