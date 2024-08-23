import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Client, IMessage} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {AuthService} from "./auth.service";
import ChatMessage from "../models/ChatMessage";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client | undefined;
  private messageSubject: Subject<ChatMessage> = new Subject<ChatMessage>();
  private connectionSubject: Subject<void> = new Subject<void>();
  private userEmail: string | null = null;

  constructor(private authService: AuthService) {
    this.authService.getUserEmail().subscribe(email => {
      this.userEmail = email;
      this.connect();
    });
  }

  private connect(): void {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.stompClient.onConnect = () => {
      this.stompClient?.subscribe(`/topic/user/${this.userEmail}`, (message: IMessage) => {
        const parsedMessage = JSON.parse(message.body) as ChatMessage;
        this.messageSubject.next(parsedMessage);
      });
      this.connectionSubject.next();
    };

    this.stompClient.activate();
  }

  sendMessage(message: ChatMessage): void {
    if (this.stompClient?.connected) {
      this.stompClient.publish({
        destination: `/app/chat.sendMessage`,
        body: JSON.stringify(message)
      });
      console.log(message);
    } else {
      console.error('STOMP client is not connected.');
    }
  }

  getMessages(): Observable<ChatMessage> {
    return this.messageSubject.asObservable();
  }
}

