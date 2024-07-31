import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://127.0.0.1:8080/api/v1/user/tickets';
  private purchaseUrl = 'http://127.0.0.1:8080/api/v1/user/purchase-ticket';
  private smsUrl = 'http://127.0.0.1:8080/api/v1/sms/send';

  constructor(private http: HttpClient) {
  }

  getTickets(userEmail: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('email', userEmail);
    return this.http.get<any>(this.apiUrl, {headers, params});
  }

  purchaseTicket(eventId: number, userEmail: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('eventId', eventId.toString()).set('email', userEmail);
    return this.http.post<any>(this.purchaseUrl, {}, {headers, params});
  }

  sendTicketSmsConfirmation(
    eventName: string,
    startDate: string,
    location: string,
    googleMapsUrl: string
  ): Observable<any> {
    const token = sessionStorage.getItem('authToken'); // Pobierz token z sessionStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const smsRequest = {
      userEmail: sessionStorage.getItem('userEmail'),
      message: `Kupiłes bilet na ${eventName} na dzień ${startDate} w ${location}. Sprawdź jak dojechać: ${googleMapsUrl}`
    };

    return this.http.post<any>(this.smsUrl, smsRequest, { headers });
  }
}
