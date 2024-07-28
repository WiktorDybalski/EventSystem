import {Component, EventEmitter, Output} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {catchError, of, tap} from "rxjs";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userEmail: string | null = null;
  @Output() userEmailChange = new EventEmitter<string | null>();
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const firstname = form.value.firstname;
      const lastname = form.value.lastname;
      const email = form.value.email;
      const password = form.value.password;

      console.log('firstname:', firstname);
      console.log('lastname:', lastname);
      console.log('Email:', email);
      console.log('Password:', password);

      this.authService.register({firstname, lastname, email, password}).pipe(
        tap(response => {
          console.log('Register success: ', response);
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
          console.error('Register Error: ', error);
          return of(null);
        })
      ).subscribe();
    }
  }
}
