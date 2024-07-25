import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {EventService} from "../services/event.service";
import {catchError, EMPTY, Observable, of, tap} from "rxjs";
import { Event } from '../models/event';
import {TicketService} from "../services/ticket.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  events$: Observable<Event[]> = of([]);

  constructor(private eventService: EventService, private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.eventService.fetchEvents();
    this.events$ = this.eventService.getEvents();
  }

  confirmPurchase(event: Event): void {
    console.log('Purchasing ticket for event:', event);
    const confirmed = confirm(`Are you sure you want to purchase a ticket for ${event.name}?`);
    if (confirmed) {
      this.ticketService.purchaseTicket(event.id).pipe(
        tap(() => alert(`Ticket purchased for ${event.name}`)),
        catchError(error => {
          alert(`Error purchasing ticket for ${event.name}`);
          return EMPTY;
        })
      ).subscribe();
    }
  }
}
