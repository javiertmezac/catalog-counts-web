export interface CatalogCountRequest {
  catalogCountEnumId: number;
  amount: number;
  details: string;
  registrationDate: number;
}

export interface CatalogCount extends CatalogCountRequest {
  id: number;
  total: number;
  catalogCountEnum: string;
}
