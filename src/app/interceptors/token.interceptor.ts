import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, pipe, switchMap, throwError } from 'rxjs';
import { UserService } from '../Services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { RefreshTokenApi } from '../Models/Token';
import { DoctorService } from '../Services/doctor.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private toast: NgToastService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.userService.getToken();
    const authTokenDoctor = this.doctorService.getToken();
    if (request.url.includes('User') && authToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      });
    } else if (request.url.includes('Doctor') && authTokenDoctor) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${authTokenDoctor}` },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          if (request.url.includes('User')) {
            return this.handleUnAuthorizedError(request, next);
          } else if (request.url.includes('Doctor')) {
            return this.handleUnAuthorizedErrorDoctor(request, next);
          }else{
            return this.handleUnAuthorizedError(request, next);
          }
        } else {
          this.toast.error({
            detail: 'ERROR',
            summary: `Error ${err.status}: ${err.statusText}`,
            duration: 5000,
          });
          console.log(err)
          return throwError(new Error(`HTTP Error: ${err.status} ${err.message}`));
        }
      })
    );
  }

  handleUnAuthorizedError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = this.userService.getRefreshToken();
    
    if (!refreshToken) {
      //this.navigateToLogin();
      return throwError(() => new Error('Refresh token not available.'));
    }

    let tokenApiModel = new RefreshTokenApi();
    tokenApiModel.accessToken = this.userService.getToken()!;
    tokenApiModel.refreshToken = refreshToken;

    return this.userService.refreshToken(tokenApiModel).pipe(
      switchMap((data: RefreshTokenApi) => {
        this.userService.storeRefreshToken(data.refreshToken);
        this.userService.storeToken(data.accessToken);
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` },
        });
        return next.handle(request);
      }),
      catchError((error) => {
        //this.navigateToLogin();
        return throwError(() => new Error('Failed to refresh token.'));
      })
    );
  }



  handleUnAuthorizedErrorDoctor(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = this.doctorService.getRefreshToken();
    
    if (!refreshToken) {
      //this.navigateToLogin();
      return throwError(() => new Error('Refresh token not available.'));
    }

    let tokenApiModel = new RefreshTokenApi();
    tokenApiModel.accessToken = this.doctorService.getToken()!;
    tokenApiModel.refreshToken = refreshToken;

    return this.doctorService.refreshToken(tokenApiModel).pipe(
      switchMap((data: RefreshTokenApi) => {
        this.doctorService.storeRefreshToken(data.refreshToken);
        this.doctorService.storeToken(data.accessToken);
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` },
        });
        return next.handle(request);
      }),
      catchError((error) => {
        //this.navigateToLogin();
        return throwError(() => new Error('Failed to refresh token.'));
      })
    );
  }
/*
  private navigateToLogin(): void {
    this.toast.warning({
      detail: "Session Timeout",
      summary: "Your session has expired, please log in again.",
      duration: 5000
    });
    this.router.navigate(['login']);
  }
*/
}
