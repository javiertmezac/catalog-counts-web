import { TestBed } from '@angular/core/testing';

import { CatalogCountService } from './catalog-count.service';

describe('CatalogCountService', () => {
  let service: CatalogCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
