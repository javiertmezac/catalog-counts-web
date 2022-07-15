import { SumIncomes } from './report-sum-incomes';
import { SumExpenses } from './report-sum-expenses';

export interface DefaultReport {
  title: string;
  mision: string;
  period: string;
  previousBalance: number;
  sumIncomes: SumIncomes;
  sumExpenses: SumExpenses;
  uncheckedExpenses: number;
  loans: number;
  total: number;
  comments: string;
  Auditor: string;
  treasurer: string;
  secretary: string;
}
