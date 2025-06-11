import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HandleHttpClientError } from '../shared/handle-error';
import { environment } from 'src/environments/environment';
import { TransferRegistry } from '../model/transfer-registry';

@Injectable({
  providedIn: 'root',
})
export class TransferRegistryService {
  private baseUri = environment.baseUri;
  private branchUri = `${this.baseUri}/v1/branch`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleHttpClientError
  ) {}

  findAllByAccount(branchId: number): Observable<any> {
    if (branchId == 0) {
      return of(null);
    }
    const uri = `${this.branchUri}/${branchId}/transferregistry`;
    return this.httpClient
      .get(uri)
      .pipe(catchError(this.handleError.handleError));
  }

  acceptTransfer(branchId: number, transferId: string): Observable<any> {
    const uri = `${this.branchUri}/${branchId}/transferregistry/${transferId}`;
    return this.httpClient.post(uri, {}).pipe(catchError(this.handleError.handleError));
  }

  emptyTransferRegistry(): TransferRegistry {
    return {
      transferRegistryId: '',
      amount: 0,
      toAccountId: 0,
      toAccountName: '',
      fromAccountId: 0,
      fromAccountName: '',
      entryDate: 0,
      entryDateText: '',
      acceptedDateText: '',
      acceptedPersona: '',
      entryPersona: '',
      fromAccountCatalogCountId: 0,
      toAccountCatalogCountId: 0
    };
  }

}
