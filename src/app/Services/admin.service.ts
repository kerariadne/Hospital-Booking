import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://localhost:44349/api/Admin'; 

  constructor(private http: HttpClient) { }

  getReports(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports`);
  }

  updateUserRole(userId: number, newRole: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/updaterole/${userId}`, { newRole });
  }

  addAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addadmin`, adminData);
  }
}
