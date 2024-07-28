import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageSubject = new BehaviorSubject<{ type: string, text: string } | null>(null);
  message$ = this.messageSubject.asObservable();

  setMessage(message: { type: string, text: string }) {
    this.messageSubject.next(message);
  }

  clearMessage() {
    this.messageSubject.next(null);
  }
}
