import { Injectable } from '@angular/core';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import { UserService } from '../user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolePermissionService {
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();

  constructor(private userService: UserService) {

    this.userService.user$.subscribe((userData) => {
      this.setIsAdmin(userData);
    })
  }

  hasUserWriteAccess(user: User) {
    return user.roles.includes(Role.Secretary);
  }

  shouldDisplayConfirmationAlert(user: User) {
    return user.roles.includes(Role.Secretary) || user.roles.includes(Role.Treasure);
  }

  setIsAdmin(user: User) {
    this.isAdminSubject.next(user.roles.includes(Role.SuperAdmin));
  }
}
