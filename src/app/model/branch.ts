export interface Branch extends BrancheBase {
  id:  number;
  registration: number
  status: boolean
  timezoneId: number,
  initialAmount: BranchInitialAmount
}

export interface BranchInitialAmount {
  id: number
  amount: number
  registration: Date
}

export interface BrancheBase {
  name: string | undefined;
  address: string;
}
