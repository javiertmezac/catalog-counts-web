import { Component } from '@angular/core';
import { TransferRegistryService } from './transfer-registry.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'cc-transferregistry',
  templateUrl: './transferregistry.component.html',
  styleUrl: './transferregistry.component.scss'
})
export class TransferregistryComponent {
  transferRegistries: any[] = []
  defaultBranch: number = 0
  errorMessage = ''

  constructor (private transferRegistryService: TransferRegistryService, private userService: UserService ) {}


  ngOnInit() {
    this.userService.user$.subscribe({
      next: data => {
        this.defaultBranch = data.defaultBranch
        this.transferRegistryService.findAllByAccount(data.defaultBranch).subscribe({
          next: response => this.transferRegistries = response
        });
      }
    });
  }

   acceptTransfer(row:any) {
    this.transferRegistryService.acceptTransfer(this.defaultBranch, row.transferRegistryId).subscribe({
      next: () => {
        alert("transferencia aceptada!");
        window.location.reload();
      },
      error: e =>  this.errorMessage = e
    })
  }
}
