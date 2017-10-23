export interface token {
  Status: string;
  result: result;
}
interface result {
  UserID: number;
  UserName: string;
  UserSecurityType: number;
  Registration: number;
  Email: string;
  IsTrader: boolean;
  BIMSIAccountNumber: number;
  Token: string;
  UserCustodians: string[];
  UserAccounts: string[];
  UserFavorite?:[{id:number,iid:number}];
}
