import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { EventService } from "../services/event.service";
import { catchError, EMPTY, Observable, of, switchMap, tap } from "rxjs";
import { Event } from '../models/event';
import { TicketService } from "../services/ticket.service";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events$: Observable<Event[]> = of([]);
  userEmail$: Observable<string | null>;

  constructor(
    private eventService: EventService,
    private ticketService: TicketService,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicjalizacja userEmail$ w konstruktorze
    this.userEmail$ = this.authService.getUserEmail();
  }

  ngOnInit(): void {
    // Inicjalizacja events$ w ngOnInit
    this.events$ = this.eventService.getEvents();
  }

  confirmPurchase(event: Event): void {
    this.authService.getIsLoggedIn().pipe(
      switchMap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return EMPTY;
        }
        return this.userEmail$;
      }),
      switchMap(userEmail => {
        if (userEmail) {
          const confirmed = confirm(`Are you sure you want to purchase a ticket for ${event.name}?`);
          if (confirmed) {
            return this.ticketService.purchaseTicket(event.id, userEmail).pipe(
              switchMap(() => {
                alert(`Ticket purchased for ${event.name}`);
                return this.ticketService.sendTicketSmsConfirmation(
                  event.name,
                  event.startDate,
                  event.location,
                  event.googleMapsUrl
                );
              }),
              tap(() => {
                alert(`SMS confirmation sent for ${event.name}`);
              }),
              catchError(() => {
                alert(`Error purchasing ticket or sending SMS for ${event.name}`);
                return EMPTY;
              })
            );
          }
        }
        return EMPTY;
      })
    ).subscribe();
  }

  openGoogleMaps(event: MouseEvent, googleMapsUrl: string): void {
    event.preventDefault();
    event.stopPropagation();

    if (googleMapsUrl) {
      window.open(googleMapsUrl, '_blank');
    } else {
      console.error('Google Maps URL is undefined');
    }
  }
}

