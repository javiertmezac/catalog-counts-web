export interface Branch extends BrancheBase {
  id:  number;
  registration: number
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

export interface RegisterBranch extends BrancheBase {
  timezoneId: number
}
