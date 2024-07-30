import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {WebSocketService} from "../services/webSocket.service";
import {LocalStorageService} from "../services/localStorage.service";
@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  messages: {user: string, content: string}[] = [];
  username : string;
  message: string = '';

  constructor(private webSocketService: WebSocketService, private localStorageService: LocalStorageService) {
    this.username = sessionStorage.getItem('userEmail') || '';
  }

  ngOnInit() {
    console.log('Starting conversation...');
    this.webSocketService.getMessages().subscribe((message: {user: string, content: string}) => {
      console.log('Received message: ', message);
      this.messages.push(message);

    });
    this.sendHello();
  }

  sendHello(): void {
    console.log(this.username + ': joined the chat!');
    const joinMessage = { user: this.username, content: `${this.username} joined the chat!` };
    this.webSocketService.sendMessage(joinMessage);
    this.messages.push(joinMessage);
  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      const chatMessage = {
        user: this.username, content: `${this.username}: ${this.message}`};
      console.log('Sending message: ' + this.message);
      this.webSocketService.sendMessage(chatMessage);
      this.message = '';
    } else {
      console.log('Message is empty, not sending.');
    }
  }


  closeChat(): void {
    console.log('Chat closed.');
    this.close.emit();
  }
}
