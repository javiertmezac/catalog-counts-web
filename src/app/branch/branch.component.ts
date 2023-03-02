import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Branch } from '../model/branch';
import { BranchService } from '../shared/branch.service';

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

  constructor(private route: ActivatedRoute, private branchService: BranchService) { 
    this.branchId = Number(this.route.snapshot.paramMap.get('misionid'));
    this.fetchBranch(this.branchId);
  }

  ngOnInit(): void {
  }

  fetchBranch(branchId: number) {
    this.branchService.getBranch(branchId).subscribe({
      next: (data) => this.branch = data,
      error: (err) => this.errorMessage = err
    });
  }

}
