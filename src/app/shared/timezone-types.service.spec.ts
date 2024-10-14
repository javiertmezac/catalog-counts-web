import { TestBed } from '@angular/core/testing';

import { TimezoneTypesService } from './timezone-types.service';

describe('TimezoneTypesService', () => {
  let service: TimezoneTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimezoneTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
