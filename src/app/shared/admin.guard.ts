import { CanActivateFn, GuardResult, MaybeAsync } from '@angular/router';
import { RolePermissionService } from './permissions/role-permission.service';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
class PermissionService {
  constructor(private rolePermissionService: RolePermissionService) { }
  canActivate(): Observable<boolean> {
    return this.rolePermissionService.isAdmin$
  }
}

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).canActivate()
};
