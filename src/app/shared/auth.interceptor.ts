import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let userDetails = this.userService.getUserDetailsFromLocalStorage();

    if (userDetails.id_token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + userDetails.id_token),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
