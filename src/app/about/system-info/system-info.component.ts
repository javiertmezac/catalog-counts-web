import { Component, OnInit } from '@angular/core';
import { SystemInfoService } from './system-info.service';

@Component({
  selector: 'cc-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.scss'],
})
export class SystemInfoComponent implements OnInit {
  constructor(private systemInfoService: SystemInfoService) {}

  ngOnInit(): void {}
}
