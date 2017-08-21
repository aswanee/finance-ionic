import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
// import {Rouiter} from './models/rouiter.model';
import { News } from "./news.interface";
import { Newsbody } from "./newsbody.interface";
import "rxjs/add/operator/map";
import { ParentService } from "./parentservice.service";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { OnInit } from "@angular/core";
import { Detailsresponse } from "./details.interface";
import { MarketDetails } from "./marketsummary.interface";
@Injectable()
export class GetService extends ParentService {
  // Comapnies: Rouiter[]= new Array();

  getmarketsummary(): Observable<MarketDetails> {
    this.getlink();
    return this.http
      .get(this.link + "GetMarketSummary?Schema=false")
      .map(x => {
        return <MarketDetails>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getquotetrades(code: string, id: number): Observable<Detailsresponse> {
    this.getlink();
    this.link = this.link + "QuoteTrades?Code=" + code + "&lID=" + id;
    // console.log(link);
    return this.http
      .get(this.link)
      .map(x => {
        console.log(x);
        return <Detailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getmarketdetails(cid: number = 1): Observable<Detailsresponse> {
    this.getlink();
    this.link = this.link + "GetMarketInformation?CID=" + cid;
    // console.log(link);
    return this.http
      .get(this.link)
      .map(x => {
        return <Detailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
}
