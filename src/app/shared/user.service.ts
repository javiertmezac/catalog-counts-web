import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserdetailsLocalstorageService } from './userdetails-localstorage.service';

export const ANONYMOUS_USER: User = {
  id_token: undefined,
  username: undefined,
  userId: 0,
  roles: [],
  branches: [],
  defaultBranch: 0,
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUri = environment.baseUri;

  private subject: BehaviorSubject<User> = new BehaviorSubject<User>(
    ANONYMOUS_USER
  );

  private loginSubject: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(
    false
  );

  user$: Observable<User> = this.subject
    .asObservable()
    .pipe(filter((user) => !!user.id_token));

  isLoggedIn$: Observable<boolean> = this.loginSubject
    .asObservable()
    .pipe(tap(console.log)); //todo: can we have something different here?

  constructor(
    private http: HttpClient,
    private userDetailsStorageService: UserdetailsLocalstorageService
  ) {
    this.loadUserDetails();
  }

  getUserDetailsFromLocalStorage(): User {
    try {
      let userDetails = this.userDetailsStorageService.getSession();
      if (userDetails.id_token != undefined) {
        return userDetails;
      } else {
        return ANONYMOUS_USER;
      }
    } catch (error) {
      return ANONYMOUS_USER;
    }
  }

  private loadUserDetails() {
    let userFromStorage = this.getUserDetailsFromLocalStorage();
    if (userFromStorage != ANONYMOUS_USER) {
      this.subject.next(userFromStorage);
      this.loginSubject.next(true);
    } else {
      this.clearUserDetails();
    }
  }

  private httpGetUserDetails(idToken: string): Observable<User> {
    return this.http.get<User>(`${this.baseUri}/v1/user`, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
  }

  fetUserDetails(idToken: string): void {
    if (idToken) {
      this.httpGetUserDetails(idToken).subscribe(
        (user) => {
          const custom_user = { ...user };
          custom_user['id_token'] = idToken;

          this.userDetailsStorageService.setSession(custom_user);

          this.subject.next(custom_user);
          this.loginSubject.next(true);
        },
        (error) => {
          this.subject.next(ANONYMOUS_USER);
        }
      );
    }
  }

  refreshUserDetails(): void {
    let userFromStorage = this.getUserDetailsFromLocalStorage();
    let token = userFromStorage.id_token;
    let defaultBranch = userFromStorage.defaultBranch;

    if (token) {
      this.httpGetUserDetails(token).subscribe((user) => {
        const custom_user = { ...user };
        custom_user['id_token'] = token;
        custom_user['defaultBranch'] = defaultBranch;

        this.userDetailsStorageService.setSession(custom_user);
      });
    }
  }

  clearUserDetails(): void {
    this.subject.next(ANONYMOUS_USER);
    this.loginSubject.next(false);
    this.userDetailsStorageService.removeSession();
  }

  changeUserDefaultBranch(branchId: number): void {
    this.userDetailsStorageService.updateDefaultBranch(branchId);
    this.subject.next({ ...this.subject.value, defaultBranch: branchId });
  }
}
