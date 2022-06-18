export interface Period {
  id: number;
  description: string;
  fromMonth: number;
  toMonth: number;
  year: number;
}

export interface PeriodConfirmation {
  periodId: number;
  branchId: number;
  registration: string;
}
