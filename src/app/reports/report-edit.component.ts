import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuditReportRequest } from '../model/audit-report-request';
import { Period } from '../model/period';
import { PeriodService } from '../shared/period.service';
import { ReportService } from './report.service';

@Component({
  selector: 'cc-repor-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss'],
})
export class ReportEditComponent implements OnInit {
  report: any;
  errorMessage = '';
  branchId: number = 0;
  period!: Period;

  constructor(
    private reportService: ReportService,
    private periodService: PeriodService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.branchId = Number(this.route.snapshot.paramMap.get('misionid'));
    let periodId = Number(this.route.snapshot.paramMap.get('periodid'));
    this.fetchPeriod(periodId);
  }

  fetchPeriod(periodid: number) {
    this.periodService.getPeriod(periodid).subscribe({
      next: (data) => {
        this.period = data;
        this.generateReport();
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  generateReport() {
    let payload: AuditReportRequest = {
      fromMonth: this.period.fromMonth,
      toMonth: this.period.toMonth,
      year: this.period.year,
      reporterComments: 'blah from blah UI',
    };
    this.reportService.generateReport(this.branchId, payload).subscribe({
      next: (response) => {
        let space = 3;
        let replacer = null;
        this.report = JSON.stringify(response, replacer, space);
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
