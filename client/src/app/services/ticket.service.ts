import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionStorageService} from "./sessionStorage.service";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly apiUrl = 'http://127.0.0.1:8080/api/v1/user/tickets';
  private readonly purchaseUrl = 'http://127.0.0.1:8080/api/v1/user/purchase-ticket';
  private readonly smsUrl = 'http://127.0.0.1:8080/api/v1/sms/send';
  private token: string | null = '';

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {
  }

  getTickets(userEmail: string): Observable<any> {
    this.token = this.sessionStorageService.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    const params = new HttpParams().set('email', userEmail);
    return this.http.get<any>(this.apiUrl, {headers, params});
  }

  purchaseTicket(eventId: number, userEmail: string): Observable<any> {
    this.token = this.sessionStorageService.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    const params = new HttpParams().set('eventId', eventId.toString()).set('email', userEmail);
    return this.http.post<any>(this.purchaseUrl, {}, {headers, params});
  }

  sendTicketSmsConfirmation(eventName: string, startDate: string, location: string, googleMapsUrl: string): Observable<any> {
    this.token = this.sessionStorageService.getAuthToken();
    const userEmail = this.sessionStorageService.getUserEmail();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    console.log(userEmail)
    const smsRequest = {
      email: userEmail,
      message: `Kupiłes bilet na ${eventName} na dzień ${startDate} w ${location}. Sprawdź jak dojechać: ${googleMapsUrl}`
    };
    return this.http.post<any>(this.smsUrl, smsRequest, {headers});
  }
}
