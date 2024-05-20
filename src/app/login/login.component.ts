import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from '../shared/user.service';

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
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.userService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigateByUrl('/cc');
      }
    });
  }

  login() {
    const val = this.form.value;
    this.isLoginBtnClickable = false;
    this.btnText = 'Ingresando...';

    setTimeout(() => {

      if (val.email && val.password) {
        this.authService.login(val.email, val.password).subscribe({
          next: async (loginResponse: any) => {
            this.userService.fetUserDetails(loginResponse.id_token);
            this.router.navigateByUrl('/cc');
          },
          error: (err: any) => {
            if (err.statusText === 'Unknown Error') {
              this.errorMessage = 'No se pudo conectar con el servidor! - Informar a Soporte!'
            } else if (err.status == 500){
              this.errorMessage = 'Error interno del servidor!, Intentar de nuevo!'
            } else if (err.status == 400) {
              this.errorMessage = 'Credenciales incorrectas!'
            } else {
              this.errorMessage = 'Error desconocido! - Informar a Soporte!'
            }

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
