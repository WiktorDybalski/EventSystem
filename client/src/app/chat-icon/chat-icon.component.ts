import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { NgIf } from '@angular/common';
import { MatFabButton } from '@angular/material/button';

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


  openChat() {
    this.isChatOpen = true;
  }

  closeChat() {
    this.isChatOpen = false;
  }
}
