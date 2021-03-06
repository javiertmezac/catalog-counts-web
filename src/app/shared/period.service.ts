import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, min } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Period, PeriodConfirmation } from '../model/period';
import { HandleHttpClientError } from './handle-error';

@Injectable({
  providedIn: 'root',
})
export class PeriodService {
  baseUri = environment.baseUri;
  periodPath = `${this.baseUri}/v1/period`;

  constructor(
    private httpClient: HttpClient,
    private handleHttpError: HandleHttpClientError
  ) {}

  confirmPeriod(branchId: number, periodId: number): Observable<any> {
    const confirmPath = `${this.baseUri}/v1/branch/${branchId}/period/${periodId}/confirm`;
    return this.httpClient
      .post(confirmPath, null)
      .pipe(catchError(this.handleHttpError.handleError));
  }

  getPeriodList(): Observable<any> {
    return this.httpClient
      .get<any>(`${this.periodPath}`)
      .pipe(catchError(this.handleHttpError.handleError));
  }

  getCurrentPeriod(): Observable<any> {
    let currentDate = new Date();
    let minDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    let baseZeroMonth = 1;
    let toMonth = minDate.getMonth() + baseZeroMonth;
    let year = minDate.getFullYear();
    return this.httpClient
      .get<any>(`${this.periodPath}?toMonth=${toMonth}&year=${year}`)
      .pipe(catchError(this.handleHttpError.handleError));
  }

  getBranchPeriodConfirmation(
    defaultBranch: number,
    periodId: number,
    confirmedByUser: number
  ): Observable<PeriodConfirmation> {
    let branchNoValid = 0;
    if (defaultBranch == branchNoValid) {
      return of<PeriodConfirmation>();
    }
    const confirmPath = `${this.baseUri}/v1/branch/${defaultBranch}/period/${periodId}/confirm?confirmedBy=${confirmedByUser}`;
    return this.httpClient
      .get<PeriodConfirmation>(confirmPath)
      .pipe(catchError(this.handleHttpError.handleError));
  }

  savePeriod(periodRequest: Period): Observable<any> {
    return this.httpClient
      .post(`${this.periodPath}`, periodRequest, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .pipe(catchError(this.handleHttpError.handleError));
  }

  updatePeriod(periodRequest: Period): Observable<any> {
    return this.httpClient
      .put(`${this.periodPath}`, periodRequest, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .pipe(catchError(this.handleHttpError.handleError));
  }

  getPeriod(periodId: number): Observable<Period> {
    if (periodId == 0) {
      return of(this.emptyPeriod());
    }

    return this.httpClient
      .get<Period>(`${this.periodPath}/${periodId}`)
      .pipe(catchError(this.handleHttpError.handleError));
  }

  emptyPeriod(): Period {
    return {
      id: 0,
      toMonth: 0,
      fromMonth: 0,
      year: 0,
      description: '',
    };
  }
}
