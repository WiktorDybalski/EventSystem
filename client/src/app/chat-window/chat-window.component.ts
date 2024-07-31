import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from "../services/webSocket.service";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  messages: { user: string, content: string }[] = [];
  username$: Observable<string | null>;
  message: string = '';

  constructor(
    private webSocketService: WebSocketService,
    private authService: AuthService
  ) {
    this.username$ = this.authService.getUserEmail();
  }

  ngOnInit() {
    this.webSocketService.getMessages().subscribe({
      next: (message: { user: string, content: string }) => {
        this.messages.push(message);
      },
      error: (error: any) => {
        console.error('Error receiving message: ', error);
      }
    });

    this.username$.subscribe(username => {
      if (username) {
        this.webSocketService.getConnection().subscribe(() => {
          this.sendHello(username);
        });
      }
    });
  }

  sendHello(username: string): void {
    console.log(username + ': joined the chat!');
    const joinMessage = { user: username, content: `${username} joined the chat!` };
    this.webSocketService.sendMessage(joinMessage);
  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.username$.subscribe(username => {
        if (username) {
          const chatMessage = {
            user: username,
            content: `${username}: ${this.message}`
          };
          this.webSocketService.sendMessage(chatMessage);
          this.message = '';
        }
      });
    } else {
      console.log('Message is empty, not sending.');
    }
  }

  closeChat(): void {
    console.log('Chat closed.');
    this.close.emit();
  }
}


