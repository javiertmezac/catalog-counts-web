export interface AuditReportRequest {
  fromMonth: number;
  toMonth: number;
  year: number;
  branchId: number;
  reporterComments: string;
}
