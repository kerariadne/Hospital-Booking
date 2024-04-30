import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RefreshTokenApi } from '../Models/Token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:44349/api/User/';
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  private email$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');
  private name$ = new BehaviorSubject<string>('');
  private lastName$ = new BehaviorSubject<string>('');
  private personalNumber$ = new BehaviorSubject<string>('');  
  private id$ = new BehaviorSubject<number>(0);
  private token$ = new BehaviorSubject<string>('');
  private refreshToken$ = new BehaviorSubject<string>('');


  public getRole(){
    return this.role$.asObservable();
  }
  public setRole(role: string) {
    this.role$.next(role);
  }
  public getemail() {
    return this.email$.asObservable();
  }
  public getName() {
    return this.name$.asObservable();
  }
  public setName(name: string) {
    this.name$.next(name);
  }
  public getLastname() {
    return this.lastName$.asObservable();
  }
  public setLastname(lastName: string) {
    this.lastName$.next(lastName);
  }
  public getPersonalNumber() {
    return this.personalNumber$.asObservable();
  }
  public setPersonalNumber(personalNumber: string) {
    this.personalNumber$.next(personalNumber);
  }
  public getId() {
    return this.id$.asObservable();
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

  
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}authenticate`, { email, password });
  }

  

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, user);
  }

  signout() {
    localStorage.clear();
    this.router.navigate(['home']);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
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


  isLoggedIn(): boolean {
    console.log('Is logged in:', !!localStorage.getItem('token'));
    return !!localStorage.getItem('token');
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
