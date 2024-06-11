import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/shared/persona.service';

@Component({
  selector: 'cc-persona-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './persona-list.component.html',
  styleUrl: './persona-list.component.scss'
})
export class PersonaListComponent {
  people: Persona[] = []
  personaService = inject(PersonaService)
  @Output() selectedPersonaEvent = new EventEmitter<Persona>();

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
}
