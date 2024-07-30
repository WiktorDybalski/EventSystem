import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Client, IMessage} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client | undefined;

  private messageSubject: Subject<{ user: string, content: string }> = new Subject<{ user: string, content: string }>();

  constructor() {
    this.connect();
  }

  private connect(): void {
    console.log('Connecting to WebSocket...');
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient?.subscribe('/topic/public', (message: IMessage) => {
        console.log('Received message: ' + message.body);
        const parsedMessage = JSON.parse(message.body) as { user: string, content: string };
        this.messageSubject.next(parsedMessage);
      });
    };

    this.stompClient.activate();
  }

  sendMessage(message: { user: string | null; content: string }): void {
    if (this.stompClient?.connected) {
      console.log('Sending message: ' + JSON.stringify(message));
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
}
