import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Period } from '../model/period';
import { User } from '../model/user';
import { PeriodService } from '../shared/period.service';
import { RolePermissionService } from '../shared/permissions/role-permission.service';
import { CatalogCountService } from './catalog-count.service';
import { CatalogCount } from './domain/catalog-count-request';
import { UserService } from '../shared/user.service';
import { Branch } from '../model/branch';
import { BranchService } from '../shared/branch.service';

@Component({
  selector: 'cc-catalog-count-list',
  templateUrl: './catalog-count-list.component.html',
  styleUrls: ['./catalog-count-list.component.scss'],
})
export class CatalogCountListComponent implements OnInit {
  catalogCounts: any[] = [];
  filteredCatalogCounts: any[] = [];
  isLoadingCatalogCounts = true;
  errorMessage: string[] = [];
  userDetails!: User;
  defaultBranch!: Branch;
  currentPeriod!: Period;
  hasWriteAccess = false;
  displayCatalogCountAlert = false;
  displayConfirmationAlert = false;
  private _listFilter = '';
  isButtonVisible = false;

  constructor(
    private ccService: CatalogCountService,
    private userService: UserService,
    private rolePermissionService: RolePermissionService,
    private periodService: PeriodService,
    private branchService: BranchService
  ) {}

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCatalogCounts = this.performFilter(value);
  }

  ngOnInit(): void {
    //todo: improve this logic
    this.userService.user$.subscribe({
      next: (data) => {
        this.cleanResources();

        this.userDetails = data;
        this.hasWriteAccess = this.rolePermissionService.hasUserWriteAccess(
          this.userDetails
        );
        this.branchService.getBranch(data.defaultBranch).subscribe((branch) => {this.defaultBranch = branch;}, (err) => this.errorMessage.push(err));

        this.fetchCatalogCountList(data.defaultBranch);
        this.getPeriodDescription();
      },
      error: (err) => (this.addOrReplaceString(err)),
    });
  }

  performFilter(filterBy: any): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.catalogCounts.filter(
      (cc: CatalogCount) =>
        cc.details.toLocaleLowerCase().includes(filterBy) ||
        cc.catalogCountEnum.toLocaleLowerCase().includes(filterBy)
    );
  }

  getPeriodDescription() {
    this.periodService.getCurrentPeriod().subscribe({
      next: (data) => {
        let takeFirstValue = 0;
        this.currentPeriod = data.periodResponseList[takeFirstValue];

        if (this.rolePermissionService.shouldDisplayConfirmationAlert(this.userDetails)) {
          this.displayConfirmationAlertDialog();
        }

      },
      error: (err) => {
        let customError =
          'IMPORTANTE!!! Avisar que no hay periodo de corte habilitado!';
        this.addOrReplaceString(customError);
      },
    });
  }

  async displayConfirmationAlertDialog() {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let minDate = 1;
    let maxDate = environment.maxDate;

    const getBranchPeriodConfirmation = await this.periodService
      .getBranchPeriodConfirmation(
        this.userDetails.defaultBranch,
        this.currentPeriod.id,
        this.userDetails.userId
      )
      .toPromise()
      .catch((data) => {
        console.log(data);
        return null;
      });

    if (date >= minDate && date <= maxDate) {
      this.displayCatalogCountAlert =
        getBranchPeriodConfirmation == null ? true : false;
      this.displayConfirmationAlert = !this.displayCatalogCountAlert;
    }
  }

  fetchCatalogCountList(branchId: number) {
    this.ccService.getCatalogCounts(branchId).subscribe({
      next: (data) => {
        this.catalogCounts = data.catalogCountResponseCollection;
        this.filteredCatalogCounts = this.catalogCounts;

        this.isLoadingCatalogCounts = false;
      },
      error: (err) => (this.addOrReplaceString(err)),
    });
  }

  deleteCatalogCount(cc: any) {
    if (confirm(`Seguro de eliminar el Catálogo de Cuenta # ${cc.id}`)) {
      this.ccService
        .deleteCatalogCount(this.userDetails.defaultBranch, cc.id)
        .subscribe({
          next: () =>
            this.fetchCatalogCountList(this.userDetails.defaultBranch),
          error: (err) => (this.addOrReplaceString(err)),
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
            error: (err) => (this.addOrReplaceString(err)),
          });
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isButtonVisible = window.scrollY > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addOrReplaceString(newErrorMessage: string) {
    const index = this.errorMessage.findIndex(str => str === newErrorMessage);

    if (index !== -1) {
      this.errorMessage[index] = newErrorMessage;
    } else {
      this.errorMessage.push(newErrorMessage);
    }
  }


  //todo: improve?
  cleanResources() {
    this.catalogCounts = [];
    this.filteredCatalogCounts = [];
    this.errorMessage = [];
    this.isLoadingCatalogCounts = true;
  }
}
