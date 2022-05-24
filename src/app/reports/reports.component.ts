import { Component, OnInit } from '@angular/core';
import { AuditReportRequest } from '../model/audit-report-request';
import { ReportService } from './report.service';

@Component({
  selector: 'cc-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  constructor(private reportService: ReportService) {}

  ngOnInit(): void {}
}
