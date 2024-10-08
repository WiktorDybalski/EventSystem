import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(message: string, type: 'success' | 'failed'): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: type === 'success' ? 'notification-good' : 'notification-bad'
    };
    this.snackBar.open(message, 'Close', config);
  }
}
