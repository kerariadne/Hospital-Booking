import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private baseUrl: string = 'https://localhost:44349/api/User/';
  constructor(private http: HttpClient) {}
  sendConfirmEmail(email: string) {
    return this.http.post<any>(
      `${this.baseUrl}send-verification-email/${email}`,
      {}
    );
  }
  verifyEmail(email: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}verify-email`, {
      params: {
        email: email,
        token: token,
      },
    });
  }


  send2FACode(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}send-2fa-code/${email}`, {});
  }

  verify2FACode(email: string, code: string): Observable<any> {
    return this.http.post(`${this.baseUrl}verify-2fa-code`, { email, code });
  }
}
