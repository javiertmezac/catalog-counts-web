import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';
import { Branch } from './model/branch';
import { User } from './model/user';
import { BranchService } from './shared/branch.service';
import { UserService } from './shared/user.service';
import { RolePermissionService } from './shared/permissions/role-permission.service';

@Component({
  selector: 'cc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'catalog-counts-web';
  isLoggedIn$: Observable<boolean> | undefined;
  userDetails!: User;
  defaultBranch!: Branch
  isAdmin$: Observable<Boolean> | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private branchService: BranchService,
    private permissionService: RolePermissionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.userService.isLoggedIn$;
    this.userService.user$.subscribe({
      next: (data) => {
        this.userDetails = data;
      },
    });

    this.branchService.defaultBranch.subscribe({
      next: (data) => {
        this.defaultBranch = data;
      }
    })

    this.isAdmin$ = this.permissionService.isAdmin$;
  }

  changeDefaultBranch(event: any) {
    this.userService.changeUserDefaultBranch(event.target.value);
  }

  refreshUserDetails() {
    this.userService.refreshUserDetails();
  }

  logout(): void {
    this.authService.logout();
    this.branchService.clearBranches();
    console.log('User is logout');
    this.router.navigateByUrl('/login');
  }
}
