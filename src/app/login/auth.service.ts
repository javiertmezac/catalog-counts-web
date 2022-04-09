import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../model/user';

export const ANONYMOUS_USER: User = {
  id_token: undefined,
  username: undefined,
  roles: [],
  defaultBranch: 0,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUri = environment.baseUri;

  private subject: BehaviorSubject<User> = new BehaviorSubject<User>(
    ANONYMOUS_USER
  );
  user$: Observable<User> = this.subject
    .asObservable()
    .pipe(filter((user) => !!user));
  isLoggedIn$: Observable<boolean> = this.subject
    .asObservable()
    .pipe(map((user) => !!user.id_token));

  constructor(private http: HttpClient) {
    this.fetUserDetails();
  }

  login(email: string, password: string): Observable<any> {
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    let body = `email=${email}&password=${password}`;

    return this.http.post<any>(`${this.baseUri}/login`, body, httpHeader).pipe(
      tap((data) => {
        this.setSession(data);
        this.fetUserDetails();
      })
    );
  }

  setSession(authResult: any) {
    localStorage.setItem('id_token', authResult.id_token);
    this.subject.next(authResult);
  }

  removeSession() {
    localStorage.clear();
    this.subject.next(ANONYMOUS_USER);
  }

  fetUserDetails(): void {
    const fromLocalStorage = localStorage.getItem('id_token');
    if (fromLocalStorage) {
      this.http.get<User>(`${this.baseUri}/v1/user`).subscribe((user) => {
        const custom_user = { id_token: fromLocalStorage, ...user };
        this.subject.next(user ? custom_user : ANONYMOUS_USER);
      });
    }
  }
}