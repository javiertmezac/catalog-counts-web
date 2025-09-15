import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject, Input } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona, PersonaUtils } from 'src/app/model/persona';
import { PersonaService } from 'src/app/shared/persona.service';
import { MatchPassword } from './match-password.validator';
import { AuthService } from 'src/app/login/auth.service';
import { Branch } from 'src/app/model/branch';
import { RoleDefinition, Role } from 'src/app/model/role';
import { BranchService } from 'src/app/shared/branch.service';

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
  errorMessage = ''
  roles: RoleDefinition[] = []
  accounts: Branch[] =  []
  personaDetails: any[] =[]

  constructor(private fb: FormBuilder,
    private branchService: BranchService
  ) { 
    this.roles = [
      {
        id: 1,
        name : 'Tesorero',
        role : Role.Treasure
      },
      {
        id: 2,
        name : 'Secretario',
        role : Role.Secretary
      },
      {
        id: 3,
        name : 'Administrador',
        role : Role.SuperAdmin
      }
    ]
  }

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


    this.rolAndBranchForm = this.fb.group({
      accountId: [null],
      roleId: [null]
    });


    this.fetchPeople();

    this.branchService.getList().subscribe({
      next: data => this.accounts = data.branchResponseList,
      error: err => this.errorMessage = err
    });
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

  assignRolAndBranch(content: any, persona: Persona) { 
    this.selectedPersona = persona;
    this.openModal(content)
    this.personaService.getPersonaRolAndBranchDetails(this.selectedPersona).subscribe({
      next: data => this.personaDetails = data.branchesAndRoles,
      error: err => this.errorMessage = err
    })
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (value) => this.clearForm(),
      (reason) => this.clearForm()
    );
  }

  clearForm() {
    this.personaLoginForm.reset();
    this.rolAndBranchForm.reset();
    this.errorMessage = ''
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

  onBranchAndRoleSubmit() {
    if (this.rolAndBranchForm.valid && this.selectedPersona) {
      this.isSubmitClickable = false;
      const payload = this.rolAndBranchForm.value
      console.log(payload)
      console.log(this.selectedPersona)
      this.personaService.assignBranchAndRole(this.selectedPersona, payload.accountId, payload.roleId).subscribe({
        next: () => { this.displayMessage('rol y cuenta signados satisfatoriamente!') },
        error: err => this.errorMessage = err,
      });
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
}
