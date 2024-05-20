import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { User } from '../model/user';
import { DateTimeHandler } from '../shared/datetime-handler';
import { CatalogCountService } from './catalog-count.service';
import { CatalogCount } from './domain/catalog-count-request';
import { UserService } from '../shared/user.service';
import { interval } from 'rxjs';

@Component({
  templateUrl: './catalog-count.component.html',
  styleUrls: ['./catalog-count.component.scss'],
})
export class CatalogCountComponent implements OnInit {
  static NumericPattern = /\d{1,}/;
  pageTitle = 'Capturar Movimiento';
  catalogCountForm!: UntypedFormGroup;
  isSubmitting = false
  errorMessage = '';
  ccEnums: any[] = [];
  userDetails!: User;
  cc!: CatalogCount;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ccService: CatalogCountService,
    private userService: UserService
  ) {
    this.catalogCountForm = this.fb.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.pattern(CatalogCountComponent.NumericPattern),
          Validators.min(0),
        ],
      ],
      details: ['', Validators.required],
      registrationDate: [Validators.required],
      catalogCountEnum: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.user$.subscribe({
      next: (data) => {
        this.userDetails = data;
        this.loadCcEnums();
      },
    });
  }

  fetchCatalogCount(ccid: Number) {
    this.ccService
      .getCatalogCount(this.userDetails.defaultBranch, ccid)
      .subscribe({
        next: (data) => {
          this.populateCatalogCount(data);
        },
        error: (err) => {
          this.errorMessage = 'Movimiento no encontrado - redirigiendo...';
          setTimeout(() => {
            this.router.navigateByUrl('/cc');
          }, 2000);
        },
      });
  }

  populateCatalogCount(catalog: CatalogCount) {
    if (this.catalogCountForm) {
      this.catalogCountForm.reset();
    }

    this.cc = catalog;

    let selectedCatalogCountEnum;
    let selectedRegistration;

    if (this.cc.id != 0) {
      this.pageTitle = 'Editar Movimiento #: ' + this.cc.id;
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
    this.catalogCountForm.patchValue({
      amount: this.cc.amount == 0 ? '' : this.cc.amount,
      details: this.cc.details,
      catalogCountEnum: selectedCatalogCountEnum[0],
      registrationDate: selectedRegistration
        ?.toLocaleString('fr-CA')
        .slice(0, 10),
    });
  }

  saveCatalogCount(): void {
    if (this.catalogCountForm.valid && this.userDetails) {
      if (this.catalogCountForm.dirty) {
        const payload = { ...this.cc, ...this.catalogCountForm.value };

        let payloadRegistration = new Date(payload.registrationDate);
        payload.registrationDate =
          (payloadRegistration.getTime() +
            DateTimeHandler.getCurrentTimeZoneMilliseconds() +
            DateTimeHandler.getDateTimeOffSetMilliseconds()) /
          1000;

        payload.catalogCountEnumId = payload.catalogCountEnum.value;

        this.isSubmitting = true;
        if (payload.id === 0) {
          this.ccService
            .saveCatalogCount(this.userDetails.defaultBranch, payload)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: (err) => {
                this.errorMessage = err
                this.isSubmitting = false;
              },
            });
        } else {
          this.ccService
            .updateCatalogCount(this.userDetails.defaultBranch, payload)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: (err) => {
                this.errorMessage = err
                this.isSubmitting = false;
              },
            });
        }
      } else {
        this.onSaveComplete();
      }
    }
  }

  onSaveComplete() {
    this.catalogCountForm.reset();
    this.isSubmitting = false;
    this.router.navigateByUrl('/cc');
  }

  //todo: improve logic
  loadCcEnums() {
    this.ccService.getCatalogCountEnums().subscribe({
      next: (data) => {
        this.ccEnums = data.catalogCountEnumList;
        const ccid = Number(this.route.snapshot.paramMap.get('ccid'));
        this.fetchCatalogCount(ccid);
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
