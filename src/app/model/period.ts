export interface Period {
  id: number;
  description: string;
}

export interface PeriodConfirmation {
  periodId: number;
  branchId: number;
  registration: string;
}
