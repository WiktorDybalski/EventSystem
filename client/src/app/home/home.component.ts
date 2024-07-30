import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { EventService } from "../services/event.service";
import { catchError, EMPTY, Observable, of, tap } from "rxjs";
import { Event } from '../models/event';
import { TicketService } from "../services/ticket.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events$: Observable<Event[]> = of([]);
  userEmail: string = sessionStorage.getItem('userEmail') || '';

  constructor(
    private eventService: EventService,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventService.fetchEvents();
    this.events$ = this.eventService.getEvents();
  }

  confirmPurchase(event: Event): void {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      this.router.navigate(['/login']);
      return;
    }
    console.log('User is logged in, proceeding with ticket purchase for event:', event);
    const confirmed = confirm(`Are you sure you want to purchase a ticket for ${event.name}?`);
    if (confirmed) {
      this.ticketService.purchaseTicket(event.id, this.userEmail).pipe(
        tap(() => {
          alert(`Ticket purchased for ${event.name}`);
          // const addToCalendarConfirmed = confirm(`Do you want to add this event to your Google Calendar?`);
          // if (addToCalendarConfirmed) {
          //   this.ticketService.addEventToGoogleCalendar(event.id, this.userEmail).pipe(
          //     tap(() => alert(`Event added to Google Calendar for ${event.name}`)),
          //     catchError(error => {
          //       alert(`Error adding event to Google Calendar for ${event.name}`);
          //       return EMPTY;
          //     })
          //   ).subscribe();
          // }
        }),
        catchError(error => {
          alert(`Error purchasing ticket for ${event.name}`);
          return EMPTY;
        })
      ).subscribe();
    }
  }

  openGoogleMaps(event: MouseEvent, googleMapsUrl: string): void {
    event.preventDefault(); // Prevent default anchor behavior
    event.stopPropagation(); // Prevent the click event from bubbling up

    // Debugging
    console.log('Opening Google Maps URL:', googleMapsUrl);

    if (googleMapsUrl) {
      window.open(googleMapsUrl, '_blank');
    } else {
      console.error('Google Maps URL is undefined');
    }
  }
}
