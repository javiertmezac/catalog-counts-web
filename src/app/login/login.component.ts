import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'cc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: UntypedFormGroup;
  errorMessage = '';
  btnText = 'Ingresar';
  isLoginBtnClickable = true;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const val = this.form.value;
    this.isLoginBtnClickable = false;
    this.btnText = 'Ingresando...';

    setTimeout(() => {

      if (val.email && val.password) {
        this.authService.login(val.email, val.password).subscribe({
          next: () => {
            this.router.navigateByUrl('/cc');
          },
          error: (err) => {
            this.errorMessage = 'Credenciales incorrectas!'
            this.isLoginBtnClickable = true;
            this.btnText = 'Ingresar';
            setTimeout(() => {
              this.errorMessage = '';
            }, 3500);
          },
        });
      }

    }, 1000);
  }
}
