import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { AuditReportRequest } from '../model/audit-report-request';
import { DefaultReport } from './domain/default-report';
import { ReportService } from './report.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'cc-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss'],
})
export class ReportEditComponent implements OnInit {
  report!: DefaultReport;
  errorMessage = '';
  branchId: number = 0;
  isLoading = true;
  @Input() inputReportRequestParams: AuditReportRequest = this.reportService.emptyReportRequestParams();

  constructor(
    private reportService: ReportService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.userService.user$.subscribe((user) => {
      this.branchId = user.defaultBranch;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const values = changes['inputReportRequestParams']
    if (values.currentValue != values.previousValue) {
      this.inputReportRequestParams = { ...values.currentValue };
      this.isLoading = true;
      this.generateReport()
    }
  }


  generateReport() {

    this.reportService.generateReport(this.branchId, this.inputReportRequestParams).subscribe({
      next: (response) => {
        this.report = response;
        this.isLoading = false;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
