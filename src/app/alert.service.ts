import { OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { alertresponse } from "./alert.interface";
import { deleteresponse } from "./delete.interface";
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
      "http://staging5.arabfinance.com/apis/account/DeleteAlert?alertIDs=2817";
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
}
