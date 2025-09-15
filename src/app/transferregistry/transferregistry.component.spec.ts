import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferregistryComponent } from './transferregistry.component';

describe('TransferregistryComponent', () => {
  let component: TransferregistryComponent;
  let fixture: ComponentFixture<TransferregistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferregistryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferregistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
