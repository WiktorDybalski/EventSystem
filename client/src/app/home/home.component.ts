import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {EventService} from "../services/event.service";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {Event} from '../models/event';
import {TicketService} from "../services/ticket.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

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
    this.userEmail$ = this.authService.getUserEmail();
  }

  ngOnInit(): void {
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

                const confirmPurchaseSms = confirm(`Do you want to send a confirmation SMS for ${event.name}?`);
                if (confirmPurchaseSms) {
                  return this.ticketService.sendTicketSmsConfirmation(
                    event.name,
                    event.startDate,
                    event.location,
                    event.googleMapsUrl
                  ).pipe(
                    tap(() => {
                      alert(`SMS confirmation sent for ${event.name}`);
                    })
                  );
                }

                return EMPTY;
              }),
              catchError(err => {
                console.error('Error occurred:', err);
                alert(`Error occurred during the process for ${event.name}`);
                return EMPTY;
              })
            );
          }
        }
        return EMPTY;
      }),
      catchError(err => {
        console.error('Unexpected error:', err);
        alert(`Unexpected error occurred`);
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

