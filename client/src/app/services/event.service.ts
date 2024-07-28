import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, of, pipe, tap} from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://127.0.0.1:8080/api/v1/events';
  private eventsSubject: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  public events$: Observable<Event[]> = this.eventsSubject.asObservable();
  constructor(private http: HttpClient) {}

  fetchEvents(): void {
    this.http.get<Event[]>(this.apiUrl).pipe(
      tap(events => {
        console.log('Fetched events from API:', events);
        this.eventsSubject.next(events);
      }),
      catchError(error => {
        console.error('Error fetching events', error);
        return of([]);
      })
    ).subscribe();
  }

  getEvents(): Observable<Event[]> {
    return this.events$;
  }
}
