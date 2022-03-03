import { Component, OnInit } from '@angular/core';
import { CatalogCountService } from './catalog-count.service';

@Component({
  selector: 'cc-catalog-count',
  templateUrl: './catalog-count.component.html',
  styleUrls: ['./catalog-count.component.scss'],
})
export class CatalogCountComponent implements OnInit {
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
