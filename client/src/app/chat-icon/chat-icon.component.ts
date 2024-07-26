import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { NgIf } from '@angular/common';
import { MatFabButton } from '@angular/material/button';
// import { WebSocketService } from '../services/webSocket.service';

@Component({
  selector: 'app-chat-icon',
  standalone: true,
  imports: [MatIcon, ChatWindowComponent, NgIf, MatFabButton],
  templateUrl: './chat-icon.component.html',
  styleUrls: ['./chat-icon.component.css']
})
export class ChatIconComponent {
  isChatOpen = false;
  userEmail: string = localStorage.getItem('userEmail') || 'User';

  // constructor(private webSocketService: WebSocketService) {}

  openChat() {
    this.isChatOpen = true;
    // this.webSocketService.addUser(this.userEmail);
  }

  closeChat() {
    this.isChatOpen = false;
  }
}
