import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonaService } from 'src/app/shared/persona.service';
import { Persona } from 'src/app/model/persona';
import { PersonaListComponent } from './persona-list.component';


@Component({
  selector: 'cc-persona-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, PersonaListComponent],
  templateUrl: './persona-edit.component.html',
  styleUrl: './persona-edit.component.scss'
})
export class PersonaEditComponent {
  title = 'Personas'
  personaForm!: FormGroup;
  errorMessage = ''
  persona: Persona = this.personaService.emptyPersona();

  constructor(private fb: FormBuilder,
    private personaService: PersonaService
  ) {}

  ngOnInit() {
    this.personaForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      status: [true, Validators.required]
    });
  }

  onSubmit() {
    if (this.personaForm.valid) {
      if (this.personaForm.dirty) {
        const persona: Persona = {...this.persona, ...this.personaForm.value };
        this.persona = persona;

        if (persona.id === 0) {
          this.personaService.insert(persona).subscribe({
            next: () => {
              alert('added successfully!')
              this.clearForm();
            },
            error: (err) => this.errorMessage = err
          })
        } else {
          this.personaService.update(persona).subscribe({
            next: () => {
              alert('updated successfully!')
              this.clearForm();
            },
            error: (err) => this.errorMessage = err
          })
        }
      }
    }
  }
  cancel() {
    this.personaForm.reset()
  }

  populate(selectedPersona: Persona) {
    if(this.personaForm) {
      this.personaForm.reset()
    }

    this.persona = selectedPersona;
    this.personaForm.patchValue({
      id: this.persona.id,
      name: this.persona.name,
      lastname: this.persona.lastname,
      status: this.persona.status
    });
  }

  clearForm() {
    this.personaForm.reset();
    this.persona = this.personaService.emptyPersona();
  }
}
