import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MyTicketsComponent} from "./my-tickets/my-tickets.component";
import {AuthGuard} from "./services/authGuard.service";
import {AdminComponent} from "./admin/admin.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'my-tickets', component: MyTicketsComponent, canActivate: [AuthGuard]},
  {path: 'chats', component: AdminComponent},
  {path: '**', redirectTo: ''}
];
