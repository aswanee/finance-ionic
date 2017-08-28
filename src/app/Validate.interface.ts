export interface ValidationResponse {
  Status: string;
  result: Validation;
}
interface Validation {
  Result: OrderOperationResult;
  Message: string;
}
export enum OrderOperationResult {
  Success,
  Failed,
  InvalidAccountNo,
  InvalidSymbolCode,
  InvalidQuantity,
  InvalidMinQty,
  InvalidMarket,
  OrderExpired,
  NoSufficientCash,
  NoSufficientStocks,
  TooLate,
  InvalideOldID,
  ExeQtyGreaterQty,
  InvalidCurrency,
  MarketClosed,
  InactiveTicker,
  OTCMarketClosed,
  InvalidMarketCode,
  NotAllowedTicker,
  InvalidPrice
}
export interface CancelResponse {
  Status: string;
  result: Cancel;
}
export interface Cancel {
  Result: CancelOrderStatus;
  Message: string;
}
export enum CancelOrderStatus {
  Completed = 1,
  InvalideUserPIN = 2,
  InvalideOrderID = 3,
  WebServiceError = 4
}
