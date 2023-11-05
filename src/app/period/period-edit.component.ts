import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Period } from '../model/period';
import { PeriodService } from '../shared/period.service';

@Component({
  selector: 'cc-period-edit',
  templateUrl: './period-edit.component.html',
  styleUrls: ['./period-edit.component.scss'],
})
export class PeriodEditComponent implements OnInit {
  private static NumericPattern = /\d{1,}/;
  pageTitle = 'Capturar Periodo';
  months: Month[] = [];
  errorMessage = '';
  periodForm!: UntypedFormGroup;
  period!: Period;

  constructor(
    private fb: UntypedFormBuilder,
    private periodService: PeriodService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.periodForm = this.fb.group({
      toMonth: ['', Validators.required],
      fromMonth: ['', Validators.required],
      year: [
        '',
        [
          Validators.required,
          Validators.min(2022),
          Validators.pattern(PeriodEditComponent.NumericPattern),
        ],
      ],
      description: ['', Validators.required],
    });

    this.lazyLoadingMonths();
  }

  ngOnInit(): void {
    const periodId = Number(this.route.snapshot.paramMap.get('periodid'));
    this.fetchPeriod(periodId);
  }

  fetchPeriod(id: number) {
    this.periodService.getPeriod(id).subscribe({
      next: (data) => this.populateData(data),
      error: (err) => (this.errorMessage = err),
    });
  }

  populateData(data: Period) {
    if (this.periodForm) {
      this.periodForm.reset();
    }

    this.period = data;

    if (this.period.id != 0) {
      this.pageTitle = 'Editar Periodo: ' + this.period.id;
    }

    this.periodForm.patchValue({
      toMonth: this.months[this.period.toMonth - 1],
      fromMonth: this.months[this.period.fromMonth - 1],
      year: this.period.year,
      description: this.period.description,
    });
  }

  savePeriod() {
    if (this.periodForm.valid) {
      if (this.periodForm.dirty) {
        const payload = { ...this.period, ...this.periodForm.value };
        payload.toMonth = payload.toMonth.id;
        payload.fromMonth = payload.fromMonth.id;

        if (payload.id === 0) {
          this.periodService.savePeriod(payload).subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => (this.errorMessage = err),
          });
        } else {
          this.periodService.updatePeriod(payload).subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => (this.errorMessage = err),
          });
        }
      } else {
        this.onSaveComplete();
      }
    }
  }

  onSaveComplete() {
    this.periodForm.reset();
    this.router.navigateByUrl('/period');
  }

  lazyLoadingMonths() {
    this.months.push({ id: 1, label: 'Enero' });
    this.months.push({ id: 2, label: 'Febrero' });
    this.months.push({ id: 3, label: 'Marzo' });
    this.months.push({ id: 4, label: 'Abril' });
    this.months.push({ id: 5, label: 'Mayo' });
    this.months.push({ id: 6, label: 'Junio' });
    this.months.push({ id: 7, label: 'Julio' });
    this.months.push({ id: 8, label: 'Agosto' });
    this.months.push({ id: 9, label: 'Septiembre' });
    this.months.push({ id: 10, label: 'Octubre' });
    this.months.push({ id: 11, label: 'Noviembre' });
    this.months.push({ id: 12, label: 'Diciembre' });
  }
}

export interface Month {
  id: number;
  label: string;
}
