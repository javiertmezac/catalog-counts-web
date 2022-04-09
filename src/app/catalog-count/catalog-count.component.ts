import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { User } from '../model/user';
import { DateTimeHandler } from '../shared/datetime-handler';
import { CatalogCountService } from './catalog-count.service';

@Component({
  templateUrl: './catalog-count.component.html',
  styleUrls: ['./catalog-count.component.scss'],
})
export class CatalogCountComponent implements OnInit {
  pageTitle = 'Capturar registro de Catálogo de Cuentas';
  catalogCountForm!: FormGroup;
  errorMessage = '';
  ccEnums: any[] = [];
  userDetails!: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ccService: CatalogCountService,
    private authService: AuthService
  ) {
    this.catalogCountForm = this.fb.group({
      amount: ['', Validators.required],
      details: ['', Validators.required],
      registrationDate: [
        new Date().toISOString().substring(0, 10),
        Validators.required,
      ],
      catalogCountEnum: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (data) => (this.userDetails = data),
    });
    this.loadCcEnums();
    //toISOString -> UTC
  }

  saveCatalogCount(): void {
    if (this.catalogCountForm.valid && this.userDetails) {
      const payload = { ...this.catalogCountForm.value };
      let payloadRegistration = new Date(payload.registrationDate);
      payload.registrationDate =
        (payloadRegistration.getTime() +
          DateTimeHandler.getCurrentTimeZoneMilliseconds() +
          DateTimeHandler.getDateTimeOffSetMilliseconds()) /
        1000;

      payload.catalogCountEnumId = payload.catalogCountEnum.value;

      this.ccService
        .saveCatalogCount(this.userDetails.defaultBranch, payload)
        .subscribe({
          next: () => {
            this.catalogCountForm.reset();
            this.router.navigateByUrl('/cc');
          },
          error: (err) => (this.errorMessage = err),
        });
    }
  }

  loadCcEnums() {
    this.ccService.getCatalogCountEnums().subscribe({
      next: (data) => (this.ccEnums = data.catalogCountEnumList),
      error: (err) => (this.errorMessage = err),
    });
  }
}
