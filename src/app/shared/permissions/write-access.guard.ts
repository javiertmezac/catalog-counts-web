import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/login/auth.service';
import { RolePermissionService } from './role-permission.service';

@Injectable({
  providedIn: 'root',
})
export class WriteAccessGuard  {
  constructor(
    private authService: AuthService,
    private rolePermissionService: RolePermissionService,
    private route: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user$.pipe(
      tap((data) => {
        console.log(data);
        if (!this.rolePermissionService.hasUserWriteAccess(data)) {
          console.log('no write acess');
          this.route.navigateByUrl('/cc');
        }
      }),
      map((value, index) =>
        this.rolePermissionService.hasUserWriteAccess(value)
      )
    );
  }
}
