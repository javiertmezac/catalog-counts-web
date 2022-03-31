import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'cc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'catalog-counts-web';
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}
