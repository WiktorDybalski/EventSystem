// import { Injectable } from '@angular/core';
// import { Client, IMessage, IFrame } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { BehaviorSubject } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketService {
//   private stompClient: Client | null = null;
//   private messageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
//
//   messages$ = this.messageSubject.asObservable();
//
//   constructor() {
//     this.connect();
//   }
//
//   connect() {
//     const socket = new SockJS('http://localhost:8080/ws');
//     this.stompClient = new Client({
//       webSocketFactory: () => socket,
//       debug: (str) => {
//         console.log(str);
//       },
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000
//     });
//
//     this.stompClient.onConnect = (frame: IFrame) => this.onConnected(frame);
//     this.stompClient.onStompError = (frame: IFrame) => this.onError(frame);
//
//     this.stompClient.activate();
//   }
//
//   onConnected(frame: IFrame) {
//     console.log('Connected: ' + frame);
//     this.stompClient!.subscribe('/topic/public', (message: IMessage) => this.onMessageReceived(message));
//   }
//
//   onError(frame: IFrame) {
//     console.error('Could not connect to WebSocket server. Please refresh this page to try again!', frame);
//   }
//
//   sendMessage(chatMessage: any) {
//     if (this.stompClient && this.stompClient.connected) {
//       this.stompClient.publish({
//         destination: '/app/chat.sendMessage',
//         body: JSON.stringify(chatMessage)
//       });
//     }
//   }
//
//   addUser(username: string) {
//     if (this.stompClient && this.stompClient.connected) {
//       const chatMessage = { sender: username, type: 'JOIN' };
//       this.stompClient.publish({
//         destination: '/app/chat.addUser',
//         body: JSON.stringify(chatMessage)
//       });
//     }
//   }
//
//   onMessageReceived(message: IMessage) {
//     const messageBody = JSON.parse(message.body);
//     this.messageSubject.next(messageBody.content);
//   }
// }
