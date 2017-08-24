export interface userorderhistoryresponse {
  Status: string;
  result: userorderhistory;
}
export interface userorderresponse {
  Status: string;
  result: userorder[];
}
export interface userorderhistory {
  _details: details[];
  BkeeperID: number;
  OrderReference: string;
  PriceType: number;
  TimeTerm: number;
  BimsUserID: number;
  ReutersCode: string;
  Side: number;
  Price: number;
  Quantity: number;
  Username: string;
  ID: number;
  BimsID: number;
  OrderDate: "string";
  SymbolCode: string;
  CurrencyCode: string;
  ExpireAt: string;
  Status: number;
  ExecutedQuantity: number;
  details: details[];
}
interface userorder extends userorderhistory {
  strOrderDate: Date;
  strExpireAt: Date;
}
export interface details {
  PlaceType: number;
  SentTime: string;
  Price: number;
  Quantity: number;
  PriceType: number;
  strSentTime: Date;
}
