import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterBranch } from 'src/app/model/branch';
import { TimeZoneTypes } from 'src/app/model/timezone-types';
import { BranchService } from 'src/app/shared/branch.service';
import { TimezoneTypesService } from 'src/app/shared/timezone-types.service';

@Component({
  selector: 'cc-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrl: './branch-edit.component.scss'
})
export class BranchEditComponent {
  title = 'Capturar Cuenta - Misión'
  errorMessage = ''
  branchForm!: FormGroup;
  timezones: TimeZoneTypes[] = []

  constructor(private fb: FormBuilder,
    private branchService: BranchService,
    private timezoneService: TimezoneTypesService) { }

  ngOnInit(): void {
    this.branchForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      timezoneId: ['', Validators.required],
    });

    this.timezoneService.getTimeZones().subscribe((data) => this.timezones = data.timezone )
  }

  onSubmit(): void {
    if (this.branchForm.valid) {
      const branch: RegisterBranch = {...this.branchForm.value};

      this.branchService.insert(branch).subscribe({
        next: () => {
          alert('added successfully!')
          this.clearForm();
        },
        error: (err) => this.errorMessage = err
      })
      }
    }

  clearForm() {
    this.branchForm.reset();
  }
}
