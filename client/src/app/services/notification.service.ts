import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(message: string, type: 'success' | 'failed'): void {
    const config: MatSnackBarConfig = {
      duration: 100000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: type === 'success' ? 'notification-good' : 'notification-bad'
    };

    console.log(message);
    this.snackBar.open(message, 'Close', config);
  }
}
