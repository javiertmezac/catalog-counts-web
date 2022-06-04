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
  errorMessage = '';
  userDetails!: User;
  currentPeriod!: Period;
  hasWriteAccess = false;
  displayCatalogCountAlert = false;

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
      },
      error: (err) => (this.errorMessage = err),
    });

    this.shouldCatalogCountAlertBeDisplayed();
  }

  getPeriodDescription() {
    this.periodService.getCurrentPeriod().subscribe({
      next: (data) => (this.currentPeriod = data),
      error: (err) => {
        let customError = 'IMPORTANTE!!! Avisar que no hay periodo habilitado!';
        this.errorMessage = customError;
      },
    });
  }

  shouldCatalogCountAlertBeDisplayed() {
    let currentDate = new Date();
    let date = currentDate.getDate();
    if (date >= 1 && date <= 7) {
      this.displayCatalogCountAlert = true;
      this.getPeriodDescription();
    }
  }

  fetchCatalogCountList(branchId: number) {
    const noValidBranch = 0;
    if (branchId != noValidBranch) {
      this.ccService.getCatalogCounts(branchId).subscribe({
        next: (data) =>
          (this.catalogCounts = data.catalogCountResponseCollection),
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
}
