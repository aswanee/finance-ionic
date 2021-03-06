import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";
// import {Rouiter} from './models/rouiter.model';
//import { News } from "./news.interface";
//import { Newsbody } from "./newsbody.interface";
import "rxjs/add/operator/map";
import { ParentService } from "./parentservice.service";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
//import { OnInit } from "@angular/core";
import { Detailsresponse } from "./details.interface";
import { MarketDetails } from "./marketsummary.interface";
@Injectable()
export class GetService extends ParentService {

  getmarketsummary(): Observable<MarketDetails> {
    this.getunsecurelink();
    return this.http
      .get(this.link + "apis/market/GetMarketSummary?Schema=false")
      .map(x => {
        return <MarketDetails>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getquotetrades(code: string, id: number): Observable<Detailsresponse> {
    this.getunsecurelink();
    this.link =
      this.link + "apis/market/QuoteTrades?Code=" + code + "&lID=" + id;
    return this.http
      .get(this.link)
      .map(x => {
        return <Detailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getmarketdetails(cid: number = 1): Observable<Detailsresponse> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetMarketInformation?CID=" + cid;
    return this.http
      .get(this.link)
      .map(x => {
        return <Detailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
}
