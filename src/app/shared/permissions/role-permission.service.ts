import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root',
})
export class RolePermissionService {
  constructor(private authService: AuthService) {}

  hasUserWriteAccess(user: User) {
    return user.roles.includes(Role.Secretary);
  }
}
