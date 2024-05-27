import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuditReportRequest } from '../model/audit-report-request';
import { HandleHttpClientError } from '../shared/handle-error';
import { DefaultReport } from './domain/default-report';
import { Month } from '../model/month';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private basePath = environment.baseUri;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleHttpClientError
  ) {}

  public emptyReportRequestParams() {
    return {
      reporterComments: '',
      fromMonth: 0,
      fromYear: 0,
      toMonth: 0,
      toYear: 0
    }
  }

  public defaultReportRequestParams() {
    let currentDate = new Date();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();

    return {
      reporterComments: '',
      fromMonth: month,
      fromYear: year,
      toMonth: month,
      toYear: year
    }
  }

  public lazyLoadingMonths(): Month[] {
    let months: Month[] = []
    months.push({ id: 1, label: 'Enero' });
    months.push({ id: 2, label: 'Febrero' });
    months.push({ id: 3, label: 'Marzo' });
    months.push({ id: 4, label: 'Abril' });
    months.push({ id: 5, label: 'Mayo' });
    months.push({ id: 6, label: 'Junio' });
    months.push({ id: 7, label: 'Julio' });
    months.push({ id: 8, label: 'Agosto' });
    months.push({ id: 9, label: 'Septiembre' });
    months.push({ id: 10, label: 'Octubre' });
    months.push({ id: 11, label: 'Noviembre' });
    months.push({ id: 12, label: 'Diciembre' });
    return months;
  }

  generateReport(
    branchId: number,
    payload: AuditReportRequest
  ): Observable<DefaultReport> {
    let url = `${this.basePath}/v1/branch/${branchId}/report/default`;
    return this.httpClient
      .post<DefaultReport>(url, payload, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .pipe(catchError(this.handleError.handleError));
  }

  periodsReportStatus(branchId: number): Observable<any> {
    let url = `${this.basePath}/v1/branch/${branchId}/report`;
    return this.httpClient
      .get(url)
      .pipe(catchError(this.handleError.handleError));
  }
}
