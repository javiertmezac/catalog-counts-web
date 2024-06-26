import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Branch, BranchInitialAmount } from '../model/branch';
import { HandleHttpClientError } from './handle-error';
import { UserService } from './user.service';

export const EMPTY_BRANCH: Branch = {
  id: 0,
  name: '',
  address: '',
  registration: 0,
  initialAmount: {
    id: 0,
    registration: new Date(),
    amount: 0,
  },
};


@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private baseUri = environment.baseUri;
  private branchPath = `${this.baseUri}/v1/branch`;

  private subject: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>([]);
  public defaultBranch: BehaviorSubject<Branch> = new BehaviorSubject<Branch>(this.emptyBranch())

  constructor(
    private httpClient: HttpClient,
    private handleHttpError: HandleHttpClientError,
    private userService: UserService,
  ) {
    this.userService.user$.subscribe({
      next: (data) => {
        this.setDefaultBranchSubject(data.defaultBranch)
      }
    })
  }

  private setDefaultBranchSubject(branchId: number){
    this.getBranch(branchId).subscribe({
      next: (data) => {
        this.defaultBranch.next(data);
      }
    })
  }

  emptyBranch(): Branch {
    return EMPTY_BRANCH;
  }

  clearBranches() {
    this.subject.next([]);
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
    var request : BranchInitialAmount = {
      id: 0,
      amount: amount,
      registration: new Date()
    }
    return this.httpClient.post<BranchInitialAmount>(`${this.branchPath}/${branch.id}`, request).pipe(catchError(this.handleHttpError.handleError));
  }
}
