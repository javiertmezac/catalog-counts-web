import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserdetailsLocalstorageService } from './userdetails-localstorage.service';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

export const ANONYMOUS_USER: User = {
  id_token: undefined,
  username: undefined,
  userId: 0,
  roles: [],
  branches: [],
  defaultBranch: 0,
  defaultRole: undefined
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
    private router: Router,
    private userDetailsStorageService: UserdetailsLocalstorageService,
    private jwtService: JwtService
  ) {
    this.loadUserDetails();//todo: how to avoid this loadUserDetails??
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
    console.log('Loading user details');
    let userFromStorage = this.getUserDetailsFromLocalStorage();
    if (userFromStorage != ANONYMOUS_USER &&
      !this.jwtService.isTokenExpired(userFromStorage.id_token || '')) {
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

  async fetUserDetails(idToken: string): Promise<any> {
    if (idToken) {
      try {
        let user = await this.httpGetUserDetails(idToken).toPromise();
        const custom_user = { ...user };
        custom_user['id_token'] = idToken;

        this.userDetailsStorageService.setSession(custom_user);

        this.subject.next(custom_user);
        this.loginSubject.next(true);
      } catch (error) {
        throw error;
      }
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
      }, (error) => {
        this.clearUserDetails();
        this.router.navigateByUrl("/login")
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
