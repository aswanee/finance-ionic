//import { OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";
import { SerResponse } from "./response.interface";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { ParentService } from "./parentservice.service";
@Injectable()
export class AskBidService extends ParentService {
  getasks(reuter: string): Observable<SerResponse> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/QuoteAsks?Code=" + reuter;
    return this.http
      .get(this.link)
      .map(x => {
        return <SerResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getbids(reuter: string): Observable<SerResponse> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/QuoteBids?Code=" + reuter;
    return this.http
      .get(this.link)
      .map(x => {
        return <SerResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
}
