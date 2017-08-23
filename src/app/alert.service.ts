import { OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers } from "@angular/http";
import { alertresponse, alert, Type, Criteria, Field } from "./alert.interface";
import { deleteresponse } from "./delete.interface";
import { add } from "./addresponse.interface";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { ParentService } from "./parentservice.service";
@Injectable()
export class AlertService extends ParentService {
  getUseralerts(id: number, update: Date): Observable<alertresponse> {
    // htis.getlink();
    this.link =
      "http://staging5.arabfinance.com/apis/account/GetUserAlerts?UserID=";
    // console.log(link);
    let stringdate = "";
    stringdate =
      update.getFullYear() +
      "-" +
      (update.getMonth() + 1) +
      "-" +
      update.getDate();

    this.link = this.link + id + "&LastUpdated=" + stringdate;
    console.log(this.link);
    return this.http
      .get(this.link)
      .map(x => {
        return <alertresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  deletealerts(id: number): Observable<deleteresponse> {
    this.link =
      "http://staging5.arabfinance.com/apis/account/DeleteAlert?alertIDs=";
    // console.log(link);
    this.link = this.link + id;
    console.log(this.link);
    return this.http
      .get(this.link)
      .map(x => {
        return <deleteresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  updatealerts(
    id: number,
    code: string,
    AlertID: number,
    Type: Type,
    Field: Field,
    Criteria: Criteria,
    Value: number,
    Note: string
  ): Observable<deleteresponse> {
    this.link = "http://staging5.arabfinance.com/apis/account/UpdateAlert";
    // console.log(link);
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let sent: string =
      "Alert={ UserID:" +
      id +
      "," +
      "Code:" +
      "'" +
      code +
      "'" +
      ",AlertID:" +
      AlertID +
      ", Type:" +
      Type +
      ",Field:" +
      Field +
      ",Criteria: " +
      Criteria +
      ",Value:" +
      Value +
      ",Note:" +
      "'" +
      Note +
      "'}";
    console.log(this.link);
    console.log(sent);
    return this.http
      .post(this.link, sent, { headers: headers })
      .map(x => {
        return <deleteresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  addalert(
    UserID: number,
    Code: string,
    Type: Type,
    Field: Field,
    Criteria: Criteria,
    Value: number,
    Note: string
  ): Observable<add> {
    this.link = "http://staging5.arabfinance.com/apis/account/AddAlert";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    console.log(this.link);
    let sent: string =
      "Alert={ UserID:" +
      UserID +
      "," +
      "Code:" +
      "'" +
      Code +
      "'" +
      ", Type: " +
      Type +
      ",Field: " +
      Field +
      ",Criteria: " +
      Criteria +
      ",Value:" +
      Value +
      ",Note:" +
      "'" +
      Note +
      "'}";
    return this.http
      .post(this.link, sent, { headers: headers })
      .map(x => {
        return <add>x.json();
      })
      .catch((t: Response) => t.json());
  }

  updatealertswithticker(
    id: number,
    code: string,
    AlertID: number,
    Type: Type,
    Field: Field,
    Criteria: Criteria,
    Value: number,
    Note: string
  ): Observable<deleteresponse> {
    this.link =
      "http://staging5.arabfinance.com/apis/account/UpdateAlertViewedByTicker?UserID=";
    // console.log(link);
    this.link = this.link + id + "&Code=" + code;
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let sent: string =
      "Alert={ UserID:" +
      id +
      "," +
      "Code:" +
      "'" +
      code +
      "'" +
      ",AlertID:" +
      AlertID +
      ", Type:" +
      Type +
      ",Field:" +
      Field +
      ",Criteria: " +
      Criteria +
      ",Value:" +
      Value +
      ",Note:" +
      "'" +
      Note +
      "'}";
    console.log(this.link);
    console.log(sent);
    return this.http
      .post(this.link, sent, { headers: headers })
      .map(x => {
        return <deleteresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
}
