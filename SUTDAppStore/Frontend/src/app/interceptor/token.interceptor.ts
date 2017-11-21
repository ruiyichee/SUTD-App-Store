
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
// import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../service/authentication.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenDict = localStorage.getItem('token');
    let token = tokenDict['key'];
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
    console.log(request);
    return next.handle(request);
  }
}