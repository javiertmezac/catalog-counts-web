import { TestBed } from '@angular/core/testing';

import { UserdetailsLocalstorageService } from './userdetails-localstorage.service';

describe('UserdetailsLocalstorageService', () => {
  let service: UserdetailsLocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserdetailsLocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
