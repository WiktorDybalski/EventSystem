import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Client, IMessage, StompConfig, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client | undefined;
  private messageSubject: Subject<{ user: string, content: string }> = new Subject<{ user: string, content: string }>();
  private connectionSubject: Subject<void> = new Subject<void>();

  constructor() {
    this.connect();
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
      this.stompClient?.subscribe('/topic/public', (message: IMessage) => {
        const parsedMessage = JSON.parse(message.body) as { user: string, content: string };
        this.messageSubject.next(parsedMessage);
      });
      this.connectionSubject.next();
    };

    this.stompClient.activate();
  }

  sendMessage(message: { user: string | null; content: string }): void {
    if (this.stompClient?.connected) {
      this.stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(message)
      });
    } else {
      console.error('STOMP client is not connected.');
    }
  }

  getMessages(): Observable<{ user: string, content: string }> {
    return this.messageSubject.asObservable();
  }

  getConnection(): Observable<void> {
    return this.connectionSubject.asObservable();
  }
}

