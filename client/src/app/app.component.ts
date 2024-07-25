import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {Observable} from "rxjs";
import {AuthService} from "./services/auth.service";
import {ChatIconComponent} from "./chat-icon/chat-icon.component";
import {ChatWindowComponent} from "./chat-window/chat-window.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ChatIconComponent, ChatWindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Event Ticketing System';
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }
}
