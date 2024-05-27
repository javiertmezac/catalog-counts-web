import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Month } from '../../model/month'
import { AuditReportRequest } from 'src/app/model/audit-report-request';
import { ReportService } from '../report.service';

@Component({
  selector: 'cc-default-custom-range',
  templateUrl: './default-custom-range.component.html',
  styleUrls: ['./default-custom-range.component.scss']
})
export class DefaultCustomRangeComponent {
 private static NumericPattern = /\d{1,}/;
  pageTitle = 'Generar Reporte';
  months: Month[] = [];
  errorMessage = '';
  defaultCustomReportForm!: UntypedFormGroup;
  reportRequestParams: AuditReportRequest = this.reportService.defaultReportRequestParams();

  constructor(
    private fb: UntypedFormBuilder,
    private reportService: ReportService
  ) {
    this.defaultCustomReportForm = this.fb.group({
      fromMonth: [this.reportRequestParams.fromMonth, Validators.required],
      fromYear: [
        this.reportRequestParams.fromYear,
        [
          Validators.required,
          Validators.min(2022),
          Validators.pattern(DefaultCustomRangeComponent.NumericPattern),
        ],
      ],
      toMonth: [this.reportRequestParams.toMonth, Validators.required],
      toYear: [
        this.reportRequestParams.toYear,
        [
          Validators.required,
          Validators.min(2022),
          Validators.pattern(DefaultCustomRangeComponent.NumericPattern),
        ],
      ]
    });

    this.months = this.reportService.lazyLoadingMonths();
  }

  ngOnInit(): void {
  }


  generateReport() {

    if (this.defaultCustomReportForm.valid) {
        this.reportRequestParams = { ...this.defaultCustomReportForm.value };
    }
  }

}
