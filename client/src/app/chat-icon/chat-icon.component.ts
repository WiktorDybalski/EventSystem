import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {ChatWindowComponent} from "../chat-window/chat-window.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-chat-icon',
  standalone: true,
  imports: [
    MatIcon,
    ChatWindowComponent,
    NgIf
  ],
  templateUrl: './chat-icon.component.html',
  styleUrl: './chat-icon.component.css'
})
export class ChatIconComponent {
  isChatOpen = false;

  openChat() {
    this.isChatOpen = true;
  }

  closeChat() {
    this.isChatOpen = false;
  }
}
