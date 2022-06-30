import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeriodReportResponse } from '../model/period-report-status';
import { ReportService } from './report.service';

@Component({
  selector: 'cc-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  periodsReportStatus: PeriodReportResponse[] = [];
  branchId = 0;

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.branchId = Number(this.route.snapshot.paramMap.get('misionid'));
    this.fetchPeriodsStatus();
  }

  fetchPeriodsStatus() {
    this.reportService.periodsReportStatus(this.branchId).subscribe({
      next: (data) => {
        this.periodsReportStatus = data.periodReportList;
      },
    });
  }
}
