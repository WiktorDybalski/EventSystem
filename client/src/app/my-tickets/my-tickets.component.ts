import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TicketService} from "../services/ticket.service";
import {catchError, of, tap} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Ticket} from "../models/ticket";

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.css'
})
export class MyTicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  userEmail: string | null = null;

  constructor(private ticketService: TicketService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    if (this.userEmail) {
      this.loadTickets(this.userEmail);
    }
  }

  loadTickets(userEmail: string): void {
    this.ticketService.getTickets(userEmail).pipe(
      tap((data) => {
        this.tickets = data;
        console.log('Tickets:', this.tickets);
      }),
      catchError((error) => {
        console.error('Error fetching tickets', error);
        return of([]);
      })
    ).subscribe();
  }
}
