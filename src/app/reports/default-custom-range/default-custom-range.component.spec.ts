import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCustomRangeComponent } from './default-custom-range.component';

describe('DefaultCustomRangeComponent', () => {
  let component: DefaultCustomRangeComponent;
  let fixture: ComponentFixture<DefaultCustomRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultCustomRangeComponent]
    });
    fixture = TestBed.createComponent(DefaultCustomRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
