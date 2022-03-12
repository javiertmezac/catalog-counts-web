import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCountListComponent } from './catalog-count-list.component';

describe('CatalogCountListComponent', () => {
  let component: CatalogCountListComponent;
  let fixture: ComponentFixture<CatalogCountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogCountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogCountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
