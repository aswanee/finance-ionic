export interface alertresponse {
  Status: string;
  result: alert[][];
}
interface alert {
  AlertID: number;
  UserID: number;
  Code: string;
  Type: number;
  Field: number;
  Criteria: number;
  Value: number;
  SetTime: string;
  MetTime: string;
  Note: string;
  Viewed: boolean;
  IsMatched: boolean;
  LastUpdated: string;
  IsDeleted: boolean;
  DoubleValue: number;
}
