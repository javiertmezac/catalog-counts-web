import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../model/user';

//todo: improve the 2 behaviorSubject into one subject
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
  private loginSubject: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(
    false
  );
  user$: Observable<User> = this.subject
    .asObservable()
    .pipe(filter((user) => !!user));
  isLoggedIn$: Observable<boolean> = this.loginSubject
    .asObservable()
    .pipe(tap(console.log)); //todo: can we have something different here?

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
    this.loginSubject.next(true);
  }

  removeSession() {
    localStorage.clear();
    this.subject.next(ANONYMOUS_USER);
    this.loginSubject.next(false);
  }

  fetUserDetails(): void {
    const fromLocalStorage = localStorage.getItem('id_token');
    if (fromLocalStorage) {
      this.loginSubject.next(true);

      this.http.get<User>(`${this.baseUri}/v1/user`).subscribe((user) => {
        const custom_user = { id_token: fromLocalStorage, ...user };
        this.subject.next(user ? custom_user : ANONYMOUS_USER);
      });
    }
  }
}
