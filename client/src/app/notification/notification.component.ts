import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() message: { type: string, text: string } | null = null;

    clearMessage() {
        this.message = null;
    }
}
