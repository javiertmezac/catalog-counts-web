import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';
import { Branch } from './model/branch';
import { User } from './model/user';
import { BranchService } from './shared/branch.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'cc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'catalog-counts-web';
  isLoggedIn$: Observable<boolean> | undefined;
  userDetails!: User;
  branchDetails!: Branch;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private branchService: BranchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.userService.isLoggedIn$;
    this.userService.user$.subscribe({
      next: (data) => {
        this.userDetails = data;
        this.fetchBranchDetails(data.defaultBranch);
      },
    });
  }

  fetchBranchDetails(defaultBranch: number) {
    this.branchService.getBranch(defaultBranch).subscribe({
      next: (branchData) => (this.branchDetails = branchData),
      error: (error) => console.log(error),
    });
  }

  changeDefaultBranch(event: any) {
    this.userService.changeUserDefaultBranch(event.target.value);
  }

  logout(): void {
    this.authService.logout();
    console.log('User is logout');
    this.router.navigateByUrl('/login');
  }
}
