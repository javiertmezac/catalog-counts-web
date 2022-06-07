import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, min } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Period } from '../model/period';
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

  getCurrentPeriod(): Observable<Period> {
    let currentDate = new Date();
    let minDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    let baseZeroMonth = 1;
    let toMonth = minDate.getMonth() + baseZeroMonth;
    let year = minDate.getFullYear();
    return this.httpClient
      .get<Period>(`${this.periodPath}?toMonth=${toMonth}&year=${year}`)
      .pipe(catchError(this.handleHttpError.handleError));
  }
}
