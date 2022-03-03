import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CatalogCountService {
  constructor(private httpClient: HttpClient) {}

  getCatalogCounts(): Observable<any> {
    return this.httpClient
      .get('http://localhost:8080/cc-service/api/v1/catalog-count')
      .pipe(catchError((httpError) => of(httpError)));
  }
}
