export interface AuditReportRequest {
  fromMonth: number;
  fromYear: number;
  toMonth: number;
  toYear: number;
  reporterComments: string;
}
