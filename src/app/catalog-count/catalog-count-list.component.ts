import { Component, OnInit } from '@angular/core';
import { CatalogCountService } from './catalog-count.service';

@Component({
  selector: 'cc-catalog-count-list',
  templateUrl: './catalog-count-list.component.html',
  styleUrls: ['./catalog-count-list.component.scss'],
})
export class CatalogCountListComponent implements OnInit {
  catalogCounts: any[] = [];
  errorMessage = '';

  constructor(private ccService: CatalogCountService) {}

  ngOnInit(): void {
    this.ccService.getCatalogCounts().subscribe({
      next: (data) =>
        (this.catalogCounts = data.catalogCountResponseCollection),
      error: (err) => (this.errorMessage = err),
    });
  }
}
