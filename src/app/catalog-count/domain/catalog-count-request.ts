export interface CatalogCountRequest {
  id: number;
  catalogCountEnumId: number;
  amount: number;
  details: string;
  registrationDate: number;
}

export interface CatalogCount extends CatalogCountRequest {
  total: number;
  catalogCountEnum: string;
  editable: boolean;
}
