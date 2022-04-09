import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CatalogCountRequest } from './domain/catalog-count-request';
import { HandleHttpClientError } from '../shared/handle-error';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogCountService {
  private baseUri = environment.baseUri;
  private catalogCountEnumUri = `${this.baseUri}/v1/catalog-count-enum`;
  private branchUri = `${this.baseUri}/v1/branch`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleHttpClientError
  ) {}

  saveCatalogCount(
    branchId: number,
    payload: CatalogCountRequest
  ): Observable<any> {
    const catalogCountUri = `${this.branchUri}/${branchId}/catalog-count`;
    return this.httpClient
      .post<CatalogCountRequest>(catalogCountUri, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(catchError(this.handleError.handleError));
  }

  getCatalogCounts(branchId: number): Observable<any> {
    if (branchId == 0) {
      return of(null);
    }
    const catalogCountUri = `${this.branchUri}/${branchId}/catalog-count`;
    return this.httpClient
      .get(catalogCountUri)
      .pipe(catchError(this.handleError.handleError));
  }

  getCatalogCountEnums(): Observable<any> {
    return this.httpClient
      .get(this.catalogCountEnumUri)
      .pipe(catchError(this.handleError.handleError));
  }
}
