export interface Branch {
  id:  number;
  name: string | undefined;
  address: string;
  registration: number
  initialAmount: BranchInitialAmount
}

export interface BranchInitialAmount {
  id: number
  amount: number
  registration: Date
}
