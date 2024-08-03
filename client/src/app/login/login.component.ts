import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {catchError, of, tap} from "rxjs";
import {NotificationService} from "../services/notification.service";

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
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.renderGoogleSignInButton();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;

      this.authService.authenticate({email, password}).pipe(
        tap(response => {
          this.authService.setUserEmail(email);
          this.authService.setLoggedIn(true);
          this.authService.setAuthToken(response.token);
          this.userEmailChange.emit(email);
          this.notificationService.showNotification('Logged in successfully', 'success');
          this.router.navigate(['/my-tickets']);
        }),
        catchError(error => {
          console.error('Login Error: ', error);
          this.notificationService.showNotification('Login Error', 'failed');
          return of(null);
        })
      ).subscribe();
    }
  }

  private renderGoogleSignInButton() {
    google.accounts.id.initialize({
      client_id: '178328488763-s1da94rqu9393kiuql32fke391p20due.apps.googleusercontent.com',
      callback: this.handleGoogleSignIn.bind(this),
      auto_select: false,
      cancel_on_tap_outside: false,
      ux_mode: 'popup',
      login_uri: 'http://localhost:8080/api/v1/auth/oauth2/google',
      cookie_policy: 'single_host_origin',
      response_type: 'code',
      access_type: 'offline',
      prompt: 'select_account consent',
      scope: 'openid email profile https://www.googleapis.com/auth/calendar'
    });
    google.accounts.id.renderButton(
      document.getElementById('g_id_signin'),
      {theme: 'filled_blue', size: 'large', shape: 'pill', width: '300'}
    );
    console.log('Google Sign-In button rendered with custom style.');
  }

  private handleGoogleSignIn(response: any) {
    console.log('Google login response: ', response);
    this.authService.authenticateGoogle(response.credential).pipe(
      tap(response => {
        console.log('Google login response: ', response);
        this.authService.setAuthToken(response.token);
        this.authService.setLoggedIn(true);
        const userEmail = this.authService.getEmailFromToken();
        this.authService.setUserEmail(userEmail);
        this.userEmailChange.emit(userEmail);
        this.notificationService.showNotification('Logged in successfully', 'success');
        this.router.navigate(['/my-tickets']);
      }),
      catchError(error => {
        console.error('Google login Error: ', error);
        this.notificationService.showNotification('Login Error', 'failed');
        return of(null);
      })
    ).subscribe();
  }
}
