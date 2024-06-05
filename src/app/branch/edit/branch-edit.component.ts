import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Branch, } from 'src/app/model/branch';
import { TimeZoneTypes } from 'src/app/model/timezone-types';
import { BranchService } from 'src/app/shared/branch.service';
import { TimezoneTypesService } from 'src/app/shared/timezone-types.service';
import { BranchListComponent } from './branch-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cc-branch-edit',
  standalone: true,
  imports: [BranchListComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './branch-edit.component.html',
  styleUrl: './branch-edit.component.scss'
})
export class BranchEditComponent {
  title = 'Capturar Cuenta - Misión'
  errorMessage = ''
  branchForm!: FormGroup;
  timezones: TimeZoneTypes[] = []
  branch: Branch = this.branchService.emptyBranch();

  constructor(private fb: FormBuilder,
    private branchService: BranchService,
    private timezoneService: TimezoneTypesService) { }

  ngOnInit(): void {
    this.branchForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      timezoneId: ['', Validators.required],
      status: [true, Validators.required]
    });

    this.timezoneService.getTimeZones().subscribe((data) => this.timezones = data.timezone)
  }

  cancel() {
    this.clearForm()
  }

  onSubmit(): void {
    if (this.branchForm.valid) {
      if (this.branchForm.dirty) {
        const branch: Branch = {...this.branch, ...this.branchForm.value };

        if (branch.id === 0) {
          this.branchService.insert(branch).subscribe({
            next: () => {
              alert('added successfully!')
              this.clearForm();
            },
            error: (err) => this.errorMessage = err
          })
        } else {
          this.branchService.update(branch).subscribe({
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

  populate(selectedBranch: Branch) {
    if (this.branchForm) {
      this.branchForm.reset();
    }

    this.branch = selectedBranch;
    this.branchForm.patchValue({
      id: this.branch.id,
      name: this.branch.name,
      address: this.branch.address,
      timezoneId: this.branch.timezoneId,
      status : this.branch.status
    })
  }

  clearForm() {
    this.branchForm.reset();
  }
}
