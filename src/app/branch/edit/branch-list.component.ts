import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Branch } from 'src/app/model/branch';
import { BranchService } from 'src/app/shared/branch.service';

@Component({
  selector: 'cc-branch-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.scss'
})
export class BranchListComponent {
  branches: Branch[] = []

  @Output() selectedBranchEvent = new EventEmitter<Branch>();

  constructor(private branchService: BranchService){}

  ngOnInit(){
    this.branchService.getList().subscribe((data) => {
      this.branches = data.branchResponseList
    })
  }

  update(selectedBranch: any) {
    this.selectedBranchEvent.emit(selectedBranch)
  }
}
