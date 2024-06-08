import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaEditComponent } from './persona-edit.component';

describe('PersonaEditComponent', () => {
  let component: PersonaEditComponent;
  let fixture: ComponentFixture<PersonaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
