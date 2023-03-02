import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';
import { Branch } from './model/branch';
import { User } from './model/user';
import { BranchService } from './shared/branch.service';

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

  constructor(private authService: AuthService,
    private branchService: BranchService,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.authService.user$.subscribe({
      next: (data) => {
        this.userDetails = data
        this.fetchBranchDetails(data.defaultBranch);
      },
    });
  }

  fetchBranchDetails(defaultBranch: number) {
    this.branchService
      .getBranch(defaultBranch).subscribe({
        next: (branchData) => this.branchDetails = branchData,
        error: (error) => console.log(error)
      })
  }

  logout(): void {
    this.authService.removeSession();
    console.log('User is logout');
    this.router.navigateByUrl('/login');
  }
}
