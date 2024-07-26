import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { catchError, of, tap } from "rxjs";
import { NotificationService } from "../services/notification.service";

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() userEmailChange = new EventEmitter<string | null>();
  userEmail: string = '';

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.renderGoogleSignInButton();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      console.log('Email:', email);
      console.log('Password:', password);

      this.authService.authenticate({ email, password }).pipe(
        tap(response => {
          console.log('Login success: ', response);
          localStorage.setItem('authToken', response.token);
          const userEmail = this.authService.getUserEmail();
          this.authService.setUserEmail(userEmail);
          this.userEmailChange.emit(userEmail);
          this.authService.setLoggedIn(true);
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('userEmail', userEmail ? userEmail : '');
          this.router.navigate(['/my-tickets']);
        }),
        catchError(error => {
          console.error('Login Error: ', error);
          return of(null);
        })
      ).subscribe();
    }
  }

  private renderGoogleSignInButton() {
    google.accounts.id.initialize({
      client_id: '178328488763-s1da94rqu9393kiuql32fke391p20due.apps.googleusercontent.com',
      // callback: this.handleGoogleSignIn.bind(this)
    });
    google.accounts.id.renderButton(
      document.getElementById('g_id_signin'),
      { theme: 'outline', size: 'large' }
    );
  }
}
