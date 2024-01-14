import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Branch } from '../model/branch';
import { HandleHttpClientError } from './handle-error';
import { CatalogCountService } from '../catalog-count/catalog-count.service';
import {
  CatalogCountRequest
} from '../catalog-count/domain/catalog-count-request';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  baseUri = environment.baseUri;
  branchPath = `${this.baseUri}/v1/branch`;

  constructor(
    private httpClient: HttpClient,
    private handleHttpError: HandleHttpClientError,
    private catalogCountService: CatalogCountService
  ) {}

  emptyBranch(): Branch {
    return {
      id: 0,
      name: '',
      address: '',
      registration: 0,
      initialAmount: {
        id: 0,
        registration: '',
        amount: 0
      }
    };
  }

  getBranch(branchId: number): Observable<Branch> {
    if(branchId == 0) {
      return of(this.emptyBranch());
    }

    return this.httpClient
      .get<Branch>(`${this.branchPath}/${branchId}`)
      .pipe(catchError(this.handleHttpError.handleError));
  }

  saveBranchInitialAmount(branch: Branch, amount: number): Observable<any> {
    var request : CatalogCountRequest = {
      id: 0,
      amount: amount,
      details: 'Monto inicial',
      registrationDate: branch.registration,
      catalogCountEnumId: 26
    }
    return this.catalogCountService.saveCatalogCount(branch.id, request);
  }

}
