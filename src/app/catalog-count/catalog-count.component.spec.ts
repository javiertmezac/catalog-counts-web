import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCountComponent } from './catalog-count.component';

describe('CatalogCountComponent', () => {
  let component: CatalogCountComponent;
  let fixture: ComponentFixture<CatalogCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
