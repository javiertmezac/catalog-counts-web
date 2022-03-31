import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CatalogCountRequest } from './domain/catalog-count-request';
import { HandleHttpClientError } from '../shared/handle-error';

@Injectable({
  providedIn: 'root',
})
export class CatalogCountService {
  constructor(
    private httpClient: HttpClient,
    private handleError: HandleHttpClientError
  ) {}

  saveCatalogCount(payload: CatalogCountRequest): Observable<any> {
    return this.httpClient
      .post<CatalogCountRequest>(
        'http://localhost:8080/cc-service/api/v1/catalog-count',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(catchError(this.handleError.handleError));
  }

  getCatalogCounts(): Observable<any> {
    return this.httpClient
      .get('http://localhost:8080/cc-service/api/v1/catalog-count')
      .pipe(catchError(this.handleError.handleError));
  }

  getCatalogCountEnums(): Observable<any> {
    return this.httpClient
      .get('http://localhost:8080/cc-service/api/v1/catalog-count-enum')
      .pipe(catchError(this.handleError.handleError));
  }
}
