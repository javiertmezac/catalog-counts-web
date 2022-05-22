import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpClientError } from 'src/app/shared/handle-error';

@Injectable({
  providedIn: 'root',
})
export class SystemInfoService {
  constructor(
    private http: HttpClient,
    private httpError: HandleHttpClientError
  ) {}

  getWebChangelog(): Observable<any> {
    let url = `https://raw.githubusercontent.com/javiertmezac/catalog-counts-web/main/changelog.md`;
    return this.http.get(url).pipe(
      tap((data) => console.log(`blah:`, data)),
      catchError(this.httpError.handleError)
    );
  }
  getServiceChangelog(): Observable<any> {
    let url = `https://raw.githubusercontent.com/javiertmezac/catalog-counts/main/CHANGELOG.md`;
    return this.http.get(url).pipe(
      tap((data) => console.log(`blah:`, data)),
      catchError(this.httpError.handleError)
    );
  }
}
