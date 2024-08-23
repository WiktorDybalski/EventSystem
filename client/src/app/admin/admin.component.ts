import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ChatWindowComponent} from "../chat-window/chat-window.component";
import {FormsModule} from "@angular/forms";
import {ChatUser} from "../models/ChatUser";
import {WebSocketService} from "../services/webSocket.service";
import ChatMessage from "../models/ChatMessage";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgForOf,
    ChatWindowComponent,
    FormsModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  activeChats: ChatUser[] = [];
  selectedChat : ChatUser = {name: '', messages: []};
  newMessage: string = '';

  constructor(private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    this.webSocketService.getMessages().subscribe({
      next: (message) => {
        const chatUser = this.activeChats.find(chatUser => chatUser.name === message.sender);
        console.log('Message received: ', message);
        console.log('Chat user: ', chatUser);
        if (chatUser) {
          chatUser.messages.push(message);
          console.log('Chat user messages: ', chatUser.messages);
        } else {
          this.activeChats.push({name: message.sender, messages: [message]});
          if (this.activeChats.length === 1) {
            this.selectedChat = this.activeChats[0];
          }
          console.log('Active chats: ', this.activeChats);
        }
      },
      error: (error) => {
        console.error('Error receiving message: ', error);
      }
    })
  }

  selectChat(user: ChatUser) {
    this.selectedChat = user;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const newChatMessage: ChatMessage = {sender: 'admin@wp.pl', recipient: this.selectedChat.name, content: this.newMessage};
      this.webSocketService.sendMessage(newChatMessage);
      this.selectedChat.messages.push(newChatMessage);
      this.newMessage = '';
    }
  }
}
