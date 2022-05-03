import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { User } from '../model/user';
import { DateTimeHandler } from '../shared/datetime-handler';
import { CatalogCountService } from './catalog-count.service';
import { CatalogCount } from './domain/catalog-count-request';

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
  cc!: CatalogCount;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ccService: CatalogCountService,
    private authService: AuthService
  ) {
    this.catalogCountForm = this.fb.group({
      amount: ['', Validators.required],
      details: ['', Validators.required],
      registrationDate: [
        // new Date().toISOString().substring(0, 10),
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

    const ccid = Number(this.route.snapshot.paramMap.get('ccid'));
    this.fetchCatalogCount(ccid);
  }

  fetchCatalogCount(ccid: Number) {
    this.ccService.getCatalogCount(0, ccid).subscribe({
      next: (data) => {
        this.populateCatalogCount(data);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  populateCatalogCount(catalog: CatalogCount) {
    if (this.catalogCountForm.valid) {
      this.catalogCountForm.reset();
    }

    this.cc = catalog;

    let selectedCatalogCountEnum;
    let selectedRegistration;

    if (this.cc.id != 0) {
      this.pageTitle = 'Editar Catálogo de Cuentas #: ' + this.cc.id;
      selectedCatalogCountEnum = this.ccEnums.filter(
        (x) => x.value == this.cc.catalogCountEnum
      );
      selectedRegistration =
        this.cc.registrationDate != null
          ? new Date(this.cc.registrationDate)
          : null;
    } else {
      selectedCatalogCountEnum = this.ccEnums;
      selectedRegistration = new Date();
    }
    // .toISOString().substring(0, 10)
    this.catalogCountForm.patchValue({
      amount: this.cc.amount == 0 ? '' : this.cc.amount,
      details: this.cc.details,
      catalogCountEnum: selectedCatalogCountEnum[0],
      // registrationDate: selectedRegistration?.toJSON().split('T')[0],
      registrationDate: selectedRegistration?.toISOString().substring(0, 10),
    });
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
