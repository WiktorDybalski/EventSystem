import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://127.0.0.1:8080/api/v1/user/tickets';
  private purchaseUrl = 'http://127.0.0.1:8080/api/v1/user/purchase-ticket';

  constructor(private http: HttpClient) {}

  getTickets(userEmail: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('email', userEmail);
    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  purchaseTicket(eventId: number) : Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('eventId', eventId);
    return this.http.post<any>(this.purchaseUrl, {headers, params});
  }
}
