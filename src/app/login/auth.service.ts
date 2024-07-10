import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserdetailsLocalstorageService } from '../shared/userdetails-localstorage.service';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleHttpClientError } from '../shared/handle-error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUri = environment.baseUri;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private handleHttpClientError: HandleHttpClientError,
    private userdetailsLocalStorageService: UserdetailsLocalstorageService
  ) { }

  login(email: string, password: string): Observable<any> {
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    let body = `email=${email}&password=${password}`;

    return this.http.post<any>(`${this.baseUri}/login`, body, httpHeader);
  }

  logout() {
    // todo: call the api to logout
    this.userdetailsLocalStorageService.removeSession();
    this.userService.clearUserDetails();
  }

  register(personaId: number, uname: string, password: string): Observable<any> {
    const payload = {
      password: password,
      username: uname,
      personaId: personaId
    }
    return this.http.post(`${this.baseUri}/login/register`, payload)
      .pipe(catchError(this.handleHttpClientError.handleError));
  }

}
