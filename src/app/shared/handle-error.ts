import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleHttpClientError {
  public handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, statusText: ${err.message}`;

      if (err.error) {
        console.log('Message:', `${err.error.message}`);
        console.log('Type:', `${err.error.type}`);
        errorMessage =
          errorMessage +
          `, message: ${err.error.message}, type: ${err.error.type}`;
      }
    }
    return throwError(errorMessage);
  }
}
