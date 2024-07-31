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

  userEmail: string = '';
  @Output() userEmailChange = new EventEmitter<string | null>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const firstname = form.value.firstname;
      const lastname = form.value.lastname;
      const phoneNumber = form.value.phoneNumber;
      const email = form.value.email;
      const password = form.value.password;


      this.authService.register({firstname, lastname, phoneNumber, email, password}).pipe(
        tap(response => {
          this.authService.setAuthToken(response.token);
          this.authService.setLoggedIn(true);
          this.authService.setUserEmail(email);
          this.userEmailChange.emit(email);
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
