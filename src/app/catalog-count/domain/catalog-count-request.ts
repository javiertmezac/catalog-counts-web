export interface CatalogCountRequest {
  id: number;
  catalogCountEnumId: number;
  amount: number;
  details: string;
  registrationDate: number;
  transferToAccountId: number;
}

export interface CatalogCount extends CatalogCountRequest {
  total: number;
  catalogCountEnum: string;
  editable: boolean;
}
