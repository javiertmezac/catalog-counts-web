import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Branch } from 'src/app/model/branch';
import { BranchService } from 'src/app/shared/branch.service';

@Component({
  selector: 'cc-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrl: './branch-edit.component.scss'
})
export class BranchEditComponent {
  title = 'Capturar Cuenta - Misión'
  errorMessage = ''
  branchForm!: FormGroup;
  branch!: Branch

  constructor(private fb: FormBuilder, private branchService: BranchService) { }

  ngOnInit(): void {
    this.branchForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.branchForm.valid) {
      const branch = {...this.branchForm.value};
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
