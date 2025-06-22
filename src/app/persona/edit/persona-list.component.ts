import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject, Input } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona, PersonaUtils } from 'src/app/model/persona';
import { PersonaService } from 'src/app/shared/persona.service';
import { MatchPassword } from './match-password.validator';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'cc-persona-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './persona-list.component.html',
  styleUrl: './persona-list.component.scss'
})
export class PersonaListComponent {
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

  personaService = inject(PersonaService)
  modalService = inject(NgbModal)
  authService = inject(AuthService)

  people: Persona[] = []
  @Output() selectedPersonaEvent = new EventEmitter<Persona>();
  @Input() updatedPersona: Persona = this.personaService.emptyPersona();
  selectedPersona: Persona = this.personaService.emptyPersona();
  personaLoginForm!: FormGroup;
  rolAndBranchForm!: FormGroup;
  loginRegistrationResult = ''
  isSubmitClickable = true 
  shouldReload = false;


  constructor(private fb: FormBuilder) { }

  ngOnChanges() {
    if (this.shouldReload === false && !PersonaUtils.isEqual(this.selectedPersona, this.updatedPersona)) {
      console.log('updated persona: ', this.updatedPersona.id)
      this.shouldReload = true;
    } else if (this.shouldReload && PersonaUtils.isEqual(this.personaService.emptyPersona(), this.updatedPersona)) {
      this.shouldReload = false;
      this.fetchPeople();
    }
  }

  ngOnInit() {

    const formOptions: AbstractControlOptions = {
      validators: MatchPassword('pass', 'passconfirm')
    };

    this.personaLoginForm = this.fb.group({
      name: ['', Validators.required],
      pass: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      passconfirm: ['', Validators.required]
    }, formOptions);

    this.fetchPeople();
  }

  private fetchPeople() {
    this.personaService.getAll().subscribe({
      next: (data) => this.people = data.personas,
      error: (err) => console.log(err)
    })
  }

  update(persona: Persona) {
    this.selectedPersona = persona
    this.selectedPersonaEvent.emit(persona);
  }

  assignLoginAccount(content: any, persona: Persona) {
    this.selectedPersona = persona;
    this.openModal(content);
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (value) => this.clearForm(),
      (reason) => this.clearForm()
    );
  }

  clearForm() {
    this.personaLoginForm.reset();
  }

  onSubmit() {
    if (this.personaLoginForm.valid && this.selectedPersona) {
      this.isSubmitClickable = false;
      const payload = this.personaLoginForm.value
      this.authService.register(this.selectedPersona.id, payload.name, payload.pass).subscribe(
        (data) => this.displayMessage(`" ${payload.name} " registro creado. (modal cierra en 2s)`),
        (error) => this.displayMessage(error)
      )
    }
  }

  displayMessage(message: string) {
    this.loginRegistrationResult = message;

    setTimeout(() => {
      this.loginRegistrationResult = '';
      this.isSubmitClickable = true;
      this.modalService.dismissAll();
    }, 2500)
  }

  assignRolAndBranch(content: any, persona: Persona) { 
    this.selectedPersona = persona;
    this.openModal(content)
  }
}
