export interface CatalogCountRequest {
  id: number;
  catalogCountEnumId: number;
  amount: number;
  details: string;
  registrationDate: number;
  outOfDateRange: boolean;
}

export interface CatalogCountCumulativeSumResponse extends CatalogCountRequest {
  total: number;
  editable: boolean;
  catalogCountEnumDisplay: string;
  entryDate: string;
}
