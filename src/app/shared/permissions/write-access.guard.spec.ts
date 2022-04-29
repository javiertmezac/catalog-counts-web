import { TestBed } from '@angular/core/testing';

import { WriteAccessGuard } from './write-access.guard';

describe('WriteAccessGuard', () => {
  let guard: WriteAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WriteAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
