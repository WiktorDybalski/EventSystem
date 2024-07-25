import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent {
  @Output() close = new EventEmitter<void>();

  closeChat() {
    this.close.emit();
  }
}
