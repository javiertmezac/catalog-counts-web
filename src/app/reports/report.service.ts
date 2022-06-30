import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuditReportRequest } from '../model/audit-report-request';
import { HandleHttpClientError } from '../shared/handle-error';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private basePath = environment.baseUri;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleHttpClientError
  ) {}

  generateReport(
    branchId: number,
    payload: AuditReportRequest
  ): Observable<any> {
    let url = `${this.basePath}/v1/branch/${branchId}/report/default`;
    return this.httpClient
      .post(url, payload, {
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
