import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {WebSocketService} from "../services/webSocket.service";
import {AuthService} from "../services/auth.service";
import ChatMessage from "../models/ChatMessage";

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  messages: ChatMessage[] = [];
  userEmail: string = '';
  message: string = '';

  constructor(private webSocketService: WebSocketService, private authService: AuthService) {
    this.authService.getUserEmail().subscribe(email => {
      this.userEmail = email !== null ? email : 'Anonymous';
    });
  }

  ngOnInit() {
    this.webSocketService.getMessages().subscribe({
      next: (message: ChatMessage) => {
        this.messages.push(message);
      },
      error: (error: any) => {
        console.error('Error receiving message: ', error);
      }
    });
  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      const chatMessage = {
        sender: this.userEmail,
        recipient: 'admin@wp.pl',
        content: `${this.message}`
      };
      this.webSocketService.sendMessage(chatMessage);
      this.messages.push(chatMessage);
      this.message = '';
    }
  }

  closeChat(): void {
    this.close.emit();
  }
}


