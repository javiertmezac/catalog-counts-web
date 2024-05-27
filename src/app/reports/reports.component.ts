import { Component, OnInit } from '@angular/core';
import { PeriodReportResponse } from '../model/period-report-status';
import { ReportService } from './report.service';
import { UserService } from '../shared/user.service';
import { PeriodService } from '../shared/period.service';
import { AuditReportRequest } from '../model/audit-report-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cc-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  periodsReportStatus: PeriodReportResponse[] = [];
  branchId = 0;
  page = 1
  pageSize = 10
  reportRequestParams!: AuditReportRequest;

  constructor(
    private reportService: ReportService,
    private userService: UserService,
    private periodService: PeriodService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.branchId = user.defaultBranch;
      this.fetchPeriodsStatus();
    });
  }

  fetchPeriodsStatus() {
    this.reportService.periodsReportStatus(this.branchId).subscribe({
      next: (data) => {
        this.periodsReportStatus = data.periodReportList;
      }
    });
  }

  generateReportForSelectedPeriod(content: any, periodId: number) {
    this.periodService.getPeriod(periodId).subscribe({
      next: (periodData) => {
        let periodRequestParams: AuditReportRequest = {
          fromMonth: periodData.fromMonth,
          fromYear: periodData.year,
          toMonth: periodData.toMonth,
          toYear: periodData.year,
          reporterComments: ''
        }
        this.reportRequestParams = periodRequestParams;
        this.openModal(content)
      }
    });
  }


  openModal(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}
}
