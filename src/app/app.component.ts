import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';
import { User } from './model/user';

@Component({
  selector: 'cc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'catalog-counts-web';
  isLoggedIn$: Observable<boolean> | undefined;
  userDetails!: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.authService.user$.subscribe({
      next: (data) => (this.userDetails = data),
    });
  }

  logout(): void {
    this.authService.removeSession();
    console.log('User is logout');
    this.router.navigateByUrl('/login');
  }
}
