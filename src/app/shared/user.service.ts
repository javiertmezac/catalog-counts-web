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
    this.fetUserDetails();
  }

  fetUserDetails(): void {
    let id_token = this.userDetailsStorageService.getSession().id_token;
    if (id_token) {
      this.loginSubject.next(true);

      this.http.get<User>(`${this.baseUri}/v1/user`).subscribe(
        (user) => {
          const custom_user = { ...user };
          custom_user['id_token'] = id_token;

          this.subject.next(custom_user);
          this.userDetailsStorageService.setSession(
            id_token,
            custom_user.defaultBranch
          );
        },
        (error) => {
          this.subject.next(ANONYMOUS_USER);
        }
      );
    }
  }

  clearUserDetails(): void {
    this.subject.next(ANONYMOUS_USER);
    this.loginSubject.next(false);
  }

  // changeUserDefaultBranch(branchId: number): void {
  //   this.http
  //     .patch<any>(
  //       `${this.baseUri}/v1/user/changeDefaultBranch?defaultBranch=${branchId}`,
  //       {}
  //     )
  //     .pipe(catchError(this.handleHttpError.handleError))
  //     .subscribe({
  //       next: () => {
  //         this.subject.next({ ...this.subject.value, defaultBranch: branchId });
  //       },
  //       error: (error) => console.log(error),
  //     });
  // }
}
