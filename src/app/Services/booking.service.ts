import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'https://localhost:44349/api/Category';


  constructor(private http: HttpClient) {}


  bookVisit(booking: any): Observable<any> {
    return this.http.post(this.apiUrl, booking);
  }


  updateBooking(id: number, booking: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, booking);
  }


  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
