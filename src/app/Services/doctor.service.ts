import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { RefreshTokenApi } from '../Models/Token';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'https://localhost:44349/api/Doctor';
  private userPayload: any;
  
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  private doctorList = new BehaviorSubject<any[]>([]);
  currentDoctorList = this.doctorList.asObservable();

  

  changeDoctorList(doctors: any[]) {
    this.doctorList.next(doctors);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }
  
  getDoctorDetails(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/details/${doctorId}`);
  }


  getDoctorsByCategoryName(categoryName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/category/${categoryName}`);
  }

  getDoctorsByName(firstName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/name/${firstName}`);
  }
  

  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  registerDoctor(doctorData: any, cvFile: File, photoFile: File): Observable<any> {
    const formData = new FormData();
    Object.keys(doctorData).forEach(key => formData.append(key, doctorData[key]));

    if (cvFile) {
      formData.append('cvFile', cvFile, cvFile.name);
    }

    if (photoFile) {
      formData.append('photoFile', photoFile, photoFile.name);
    }

    return this.http.post(`${this.apiUrl}/register`, formData);
  }

  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getDoctor(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateDoctor(id: number, doctor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, doctor);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  sendResetEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-reset-email/${email}`, {});
  }

  verifyEmail(email: string, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify-email`, {
      params: { email, token }
    });
  }


  private email$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');


  public getRole(){
    return this.role$.asObservable();
  }
  public setRole(role: string) {
    this.role$.next(role);
  }
  public getemail() {
    return this.email$.asObservable();
  }

  
  public setemail(email: string) {
    this.email$.next(email);
  }

  getemailFromToken() {
    if (this.userPayload) return this.userPayload.email;
  }


  getRoleFromToken() {
    if (!this.userPayload) {
      this.userPayload = this.decodedToken();
    }
    return this.userPayload ? this.userPayload.Role : null;
  }

  

  signout() {
    localStorage.clear();
    this.router.navigate(['home']);
  }



  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  getToken() {
    console.log('Token:', localStorage.getItem('token'));
    return localStorage.getItem('token');
  }


  getRefreshToken() {
    console.log('Refresh Token:', localStorage.getItem('refreshToken'));
    return localStorage.getItem('refreshToken');
  }



  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const rokenf = localStorage.getItem('token');
    console.log('wtfffff', rokenf );
    if (!rokenf) {
      console.warn('No token available for decoding');
      return null;
    }
    const decoded = jwtHelper.decodeToken(rokenf);
    console.log('Decoded token:', decoded);
    console.log(jwtHelper.decodeToken(rokenf));
    return jwtHelper.decodeToken(rokenf);
  }

  refreshToken(tokenApi: RefreshTokenApi) {
    return this.http.post<any>(`${this.apiUrl}refresh`, tokenApi);
  }
  
}