import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogCountService } from './catalog-count.service';

@Component({
  templateUrl: './catalog-count.component.html',
  styleUrls: ['./catalog-count.component.scss'],
})
export class CatalogCountComponent implements OnInit {
  pageTitle = 'Favor de capturar otro registro (Catálogo de Cuentas)';
  catalogCountForm!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private ccService: CatalogCountService) {
    this.catalogCountForm = this.fb.group({
      amount: ['', Validators.required],
      details: '',
      registrationDate: '',
      catalogCountEnumId: '',
    });
  }

  ngOnInit(): void {}

  saveCatalogCount(): void {}
}
