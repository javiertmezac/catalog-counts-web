import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleHttpClientError {
  public handleError(err: HttpErrorResponse): Observable<never> {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, statusText: ${err.message}`;

      if (err.error) {
        errorMessage =
          errorMessage +
          `, message: ${err.error.message}, type: ${err.error.type}`;
      }
    }
    return throwError(errorMessage);
  }
}
