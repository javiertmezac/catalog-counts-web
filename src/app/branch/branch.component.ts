import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Branch } from '../model/branch';
import { BranchService } from '../shared/branch.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CatalogCountComponent } from '../catalog-count/catalog-count.component';

@Component({
  selector: 'cc-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  pageTitle = "Detalles de la Misión"
  branchId: number = 0;
  errorMessage = ''
  branch!: Branch
  branchInitialAmountForm: UntypedFormGroup = new UntypedFormGroup({})

  constructor(private route: ActivatedRoute, private branchService: BranchService, private fb: UntypedFormBuilder) {

    this.branchId = Number(this.route.snapshot.paramMap.get('misionid'));
    this.fetchBranch(this.branchId);

    this.branchInitialAmountForm = this.fb.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.pattern(CatalogCountComponent.NumericPattern),
          Validators.min(0),
        ],
      ]
    })

  }

  ngOnInit(): void {
  }

  fetchBranch(branchId: number) {
    this.branchService.getBranch(branchId).subscribe({
      next: (data) => this.branch = data,
      error: (err) => this.errorMessage = err
    });
  }

  saveBranchInitialAmount(): void {
    this.branchService.saveBranchInitialAmount(this.branch, this.branchInitialAmountForm.value.amount)
    .subscribe({ next: () => this.fetchBranch(this.branchId), error: (err) => this.errorMessage = err});
  }

  getBranch(event: any) {}

}
