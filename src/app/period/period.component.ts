import { Component, OnInit } from '@angular/core';
import { Period } from '../model/period';
import { PeriodService } from '../shared/period.service';

@Component({
  selector: 'cc-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss'],
})
export class PeriodComponent implements OnInit {
  periodList: Period[] = [];
  errorMessage = '';

  constructor(private periodService: PeriodService) {}

  ngOnInit(): void {
    this.fetchPeriodList();
  }

  fetchPeriodList() {
    this.periodService.getPeriodList().subscribe({
      next: (data) => (this.periodList = data.periodResponseList),
      error: (err) => (this.errorMessage = err),
    });
  }
}
