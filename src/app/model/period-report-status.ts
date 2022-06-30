export interface PeriodReportResponse {
  periodId: number;
  periodDescription: string;
  reportUUID: string;
  confirmationList: PeriodReportDetailsResponse[];
}

export interface PeriodReportDetailsResponse {
  personaId: number;
  confirmationDate: string;
  roleId: number;
  roleDescription: string;
}
