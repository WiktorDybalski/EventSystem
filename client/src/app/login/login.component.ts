import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {catchError, of, tap} from "rxjs";
import {AlertService} from "../services/alert.service";

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
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.renderGoogleSignInButton();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      console.log('Email:', email);
      console.log('Password:', password);

      this.authService.authenticate({email, password}).pipe(
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
          this.alertService.setMessage({type: 'success', text: 'Login successful!'});
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
    console.log('Google Sign-In response:', response);

    // Check if the response includes the necessary scopes
    if (response.scope && response.scope.includes('https://www.googleapis.com/auth/calendar')) {
      console.log('Calendar scope granted.');
    } else {
      console.error('Calendar scope not granted.');
    }
    this.authService.authenticateGoogle(response.credential).pipe(
      tap(response => {
        console.log('Google login success: ', response);
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
        console.error('Google login Error: ', error);
        return of(null);
      })
    ).subscribe();
  }
}
