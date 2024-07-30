import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {Observable} from "rxjs";
import {AuthService} from "./services/auth.service";
import {ChatIconComponent} from "./chat-icon/chat-icon.component";
import {ChatWindowComponent} from "./chat-window/chat-window.component";
import {AlertService} from "./services/alert.service";
import {AlertComponent} from "./alert/alert.component";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ChatIconComponent, ChatWindowComponent, AlertComponent, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Event Ticketing System';
  isLoggedIn$: Observable<boolean>;
  alertMessage: { type: string, text: string } | null = null;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }
}
