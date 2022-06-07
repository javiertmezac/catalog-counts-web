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
  private reportAuditEndpoint = `${this.basePath}/v1/report/audit`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleHttpClientError
  ) {}

  generateReport(payload: AuditReportRequest): Observable<any> {
    return this.httpClient
      .post(this.reportAuditEndpoint, payload, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .pipe(catchError(this.handleError.handleError));
  }
}
