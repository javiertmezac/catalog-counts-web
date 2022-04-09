import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { User } from '../model/user';
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

  constructor(
    private ccService: CatalogCountService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (data) => {
        this.userDetails = data;
        this.fetchCatalogCountList(data.defaultBranch);
      },
    });
  }

  fetchCatalogCountList(branchId: number) {
    this.ccService.getCatalogCounts(branchId).subscribe({
      next: (data) =>
        (this.catalogCounts = data.catalogCountResponseCollection),
      error: (err) => (this.errorMessage = err),
    });
  }
}
