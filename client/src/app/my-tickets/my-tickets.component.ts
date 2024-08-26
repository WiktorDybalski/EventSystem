import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TicketService } from "../services/ticket.service";
import { catchError, Observable, of, tap, switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Ticket } from "../models/ticket";

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  userEmail$: Observable<string | null>;

  constructor(private ticketService: TicketService, private authService: AuthService) {
    this.userEmail$ = this.authService.getUserEmail();
  }

  ngOnInit(): void {
    this.userEmail$.pipe(
      switchMap(userEmail => {
        if (userEmail) {
          return this.ticketService.getTickets(userEmail);
        } else {
          return of([] as Ticket[]);
        }
      }),
      tap((data: Ticket[]) => {
        this.tickets = data;
      }),
      catchError((error) => {
        console.error('Error fetching tickets', error);
        return of([] as Ticket[]);
      })
    ).subscribe();
  }
}
