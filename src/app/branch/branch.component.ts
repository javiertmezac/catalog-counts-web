import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Branch } from '../model/branch';
import { BranchService } from '../shared/branch.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CatalogCountComponent } from '../catalog-count/catalog-count.component';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'cc-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
})
export class BranchComponent implements OnInit {
  pageTitle = 'Detalles de la Cuenta';
  branchId: number = 0;
  errorMessage = '';
  branch!: Branch;
  branchInitialAmountForm: UntypedFormGroup = new UntypedFormGroup({});

  constructor(
    private userService: UserService,
    private branchService: BranchService,
    private fb: UntypedFormBuilder
  ) {

    this.userService.user$.subscribe((user) => {
      this.branchId = user.defaultBranch;
      this.fetchBranch(this.branchId);
    });

    this.branchInitialAmountForm = this.fb.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.pattern(CatalogCountComponent.NumericPattern),
          Validators.min(0),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  fetchBranch(branchId: number) {
    this.branchService.getBranch(branchId).subscribe({
      next: (data) => (this.branch = data),
      error: (err) => (this.errorMessage = err),
    });
  }

  saveBranchInitialAmount(): void {
    this.branchService
      .saveBranchInitialAmount(
        this.branch,
        this.branchInitialAmountForm.value.amount
      )
      .subscribe({
        next: () => this.fetchBranch(this.branchId),
        error: (err) => (this.errorMessage = err),
      });
  }
}
