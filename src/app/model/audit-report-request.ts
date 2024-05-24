import { BaseDefaultPeriodReport } from "./period";

export interface AuditReportRequest extends BaseDefaultPeriodReport {
  reporterComments: string;
}
