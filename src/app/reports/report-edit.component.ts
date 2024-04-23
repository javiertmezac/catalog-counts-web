import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditReportRequest } from '../model/audit-report-request';
import { Period } from '../model/period';
import { PeriodService } from '../shared/period.service';
import { DefaultReport } from './domain/default-report';
import { ReportService } from './report.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'cc-repor-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss'],
})
export class ReportEditComponent implements OnInit {
  report!: DefaultReport;
  errorMessage = '';
  branchId: number = 0;
  period!: Period;

  constructor(
    private reportService: ReportService,
    private periodService: PeriodService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.userService.user$.subscribe((user) => {
      let periodId = Number(this.route.snapshot.paramMap.get('periodid'));
      this.branchId = user.defaultBranch;
      this.fetchPeriod(periodId);
    });
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
      reporterComments: '',
    };
    this.reportService.generateReport(this.branchId, payload).subscribe({
      next: (response) => {
        this.report = response;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
