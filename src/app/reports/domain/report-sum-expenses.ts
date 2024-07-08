export interface SumExpenses {
  services: number;
  helps: number;
  general: number;
  food: number;
  traveling: number;
  stationery: number;
  fees: number;
  immovables: number;
  sumExpensesTotal: number;
  sumExpensesDetails: SumExpensesDetails[];
}

export interface SumExpensesDetails {
  sumAmount: number;
  family: string;
  name: string;
  identifier: string
}
