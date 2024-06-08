import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Persona, PersonaResponse } from 'src/app/model/persona';
import { PersonaService } from 'src/app/shared/persona.service';

@Component({
  selector: 'cc-persona-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './persona-list.component.html',
  styleUrl: './persona-list.component.scss'
})
export class PersonaListComponent {
  people: PersonaResponse[] = []
  personaService = inject(PersonaService)

  ngOnInit() {
    this.personaService.getAll().subscribe({
      next: (data) => this.people = data.personas,
      error: (err) => console.log(err)
    })
  }

  update(persona: Persona) {}
}
