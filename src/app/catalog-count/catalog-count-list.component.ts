import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Period } from '../model/period';
import { User } from '../model/user';
import { PeriodService } from '../shared/period.service';
import { RolePermissionService } from '../shared/permissions/role-permission.service';
import { CatalogCountService } from './catalog-count.service';

@Component({
  selector: 'cc-catalog-count-list',
  templateUrl: './catalog-count-list.component.html',
  styleUrls: ['./catalog-count-list.component.scss'],
})
export class CatalogCountListComponent implements OnInit {
  catalogCounts: any[] = [];
  isLoadingCatalogCounts = true;
  errorMessage = '';
  userDetails!: User;
  currentPeriod!: Period;
  hasWriteAccess = false;
  displayCatalogCountAlert = false;
  displayConfirmationAlert = false;

  constructor(
    private ccService: CatalogCountService,
    private authService: AuthService,
    private rolePermissionService: RolePermissionService,
    private periodService: PeriodService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (data) => {
        this.userDetails = data;
        this.hasWriteAccess = this.rolePermissionService.hasUserWriteAccess(
          this.userDetails
        );
        this.fetchCatalogCountList(data.defaultBranch);
        this.getPeriodDescription();
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  getPeriodDescription() {
    this.periodService.getCurrentPeriod().subscribe({
      next: (data) => {
        this.currentPeriod = data;
        this.shouldCatalogCountAlertBeDisplayed();
      },
      error: (err) => {
        let customError = 'IMPORTANTE!!! Avisar que no hay periodo habilitado!';
        this.errorMessage = customError;
      },
    });
  }

  async shouldCatalogCountAlertBeDisplayed() {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let minDate = 1;
    let maxDate = 11;

    const getBranchPeriodConfirmation = await this.periodService
      .getBranchPeriodConfirmation(
        this.userDetails.defaultBranch,
        this.currentPeriod.id
      )
      .toPromise()
      .catch((data) => {
        console.log(data);
        return null;
      });

    if (
      date >= minDate &&
      date <= maxDate &&
      getBranchPeriodConfirmation == null
    ) {
      this.displayCatalogCountAlert = true;
    } else {
      this.displayCatalogCountAlert = false;
      this.displayConfirmationAlert = true;
    }
  }

  fetchCatalogCountList(branchId: number) {
    const noValidBranch = 0;
    if (branchId != noValidBranch) {
      this.ccService.getCatalogCounts(branchId).subscribe({
        next: (data) => {
          this.catalogCounts = data.catalogCountResponseCollection;
          this.isLoadingCatalogCounts = false;
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  deleteCatalogCount(cc: any) {
    if (confirm(`Seguro de eliminar el Catálogo de Cuenta # ${cc.id}`)) {
      this.ccService
        .deleteCatalogCount(this.userDetails.defaultBranch, cc.id)
        .subscribe({
          next: () =>
            this.fetchCatalogCountList(this.userDetails.defaultBranch),
          error: (err) => (this.errorMessage = err),
        });
    }
  }

  confirmPeriod() {
    if (
      confirm(
        `Seguro de proceder con la confirmación?, \n después de aceptar no habrá cambios en el mes anterior`
      )
    ) {
      if (this.currentPeriod && this.userDetails) {
        this.periodService
          .confirmPeriod(this.userDetails.defaultBranch, this.currentPeriod.id)
          .subscribe({
            next: () => {
              this.ngOnInit();
            },
            error: (err) => (this.errorMessage = err),
          });
      }
    }
  }
}
