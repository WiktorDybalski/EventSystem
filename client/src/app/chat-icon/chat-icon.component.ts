import {Component} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {ChatWindowComponent} from '../chat-window/chat-window.component';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatFabButton} from '@angular/material/button';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-chat-icon',
  standalone: true,
  imports: [MatIcon, ChatWindowComponent, NgIf, MatFabButton, AsyncPipe],
  templateUrl: './chat-icon.component.html',
  styleUrls: ['./chat-icon.component.css']
})
export class ChatIconComponent {
  isChatOpen: boolean = false;
  userEmail$: Observable<string | null> = new Observable<string | null>();

  constructor(private authService: AuthService) {
    this.userEmail$ = this.authService.getUserEmail();
  }

  openChat() {
    this.isChatOpen = true;
  }

  closeChat() {
    this.isChatOpen = false;
  }
}
