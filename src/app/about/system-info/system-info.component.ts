import { Component, OnInit } from '@angular/core';
import { SystemInfoService } from './system-info.service';

@Component({
  selector: 'cc-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.scss'],
})
export class SystemInfoComponent implements OnInit {
  webChangelog: String = '';
  serviceChangelog: String = '';
  errorMessage = '';

  constructor(private systemInfoService: SystemInfoService) {}

  ngOnInit(): void {
    this.systemInfoService.getWebChangelog().subscribe({
      next: (data) => (this.webChangelog = data),
      error: (err) => (this.errorMessage = err),
    });

    this.systemInfoService.getServiceChangelog().subscribe({
      next: (data) => (this.serviceChangelog = data),
      error: (err) => (this.errorMessage = err),
    });
  }
}
