import { CommonModule } from '@angular/common';
import { Component, EventEmitter,  Output,  inject } from '@angular/core';
import { FormGroup,  ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/shared/persona.service';

@Component({
  selector: 'cc-persona-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './persona-list.component.html',
  styleUrl: './persona-list.component.scss'
})
export class PersonaListComponent {
  people: Persona[] = []
  personaService = inject(PersonaService)
  modalService = inject(NgbModal)
  @Output() selectedPersonaEvent = new EventEmitter<Persona>();
  selectedPersona: Persona = this.personaService.emptyPersona();
  personaLoginForm!: FormGroup;

  ngOnInit() {
    this.fetchPeople();
  }

  private fetchPeople() {
    this.personaService.getAll().subscribe({
      next: (data) => this.people = data.personas,
      error: (err) => console.log(err)
    })
  }

  update(persona: Persona) {
    this.selectedPersonaEvent.emit(persona);
  }



  assignLoginAccount(content: any, persona: Persona) {
    this.selectedPersona = persona;
    this.openModal(content);
  }

  openModal(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

  onSubmit() {

  }

  cancel() {}
  generateRandomPassword(persona: Persona){}
}
