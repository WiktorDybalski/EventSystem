import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { WebSocketService } from '../services/webSocket.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  @Output() close = new EventEmitter<void>();
  messages: string[] = [];
  message: string = '';
  username: string = localStorage.getItem('username') || 'New User';

  // constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    // this.webSocketService.messages$.subscribe((msg) => {
    //   this.messages.push(msg);
    // });
  }

  closeChat() {
    this.close.emit();
  }

  sendMessage() {
    if (this.message.trim()) {
      const chatMessage = {
        sender: this.username,
        content: this.message,
        type: 'CHAT'
      };
      // this.webSocketService.sendMessage(chatMessage);
      this.message = '';
    }
  }
}
