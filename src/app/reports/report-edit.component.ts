import { Component, OnInit } from '@angular/core';
import { AuditReportRequest } from '../model/audit-report-request';
import { ReportService } from './report.service';

@Component({
  selector: 'cc-repor-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss'],
})
export class ReportEditComponent implements OnInit {
  report: any;
  errorMessage = '';

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {}

  generateReport() {
    let payload: AuditReportRequest = {
      fromMonth: 4,
      toMonth: 4,
      year: 2022,
      branchId: 1,
      reporterComments: 'blah from blah UI',
    };
    this.reportService.generateReport(payload).subscribe({
      next: (response) => {
        let space = 3;
        let replacer = null;
        this.report = JSON.stringify(response, replacer, space);
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
