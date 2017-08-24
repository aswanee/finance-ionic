import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { SerResponse } from "./response.interface";
import { MarketResponse } from "./Marketresponse.interface";
import { ParentService } from "./parentservice.service";
@Injectable()
export class MarketService extends ParentService {
  getperformers(id: string, isArabaic: boolean): Observable<SerResponse> {
    this.getsecurelink();
    let link = this.link + "apis/market/GetPerformers?TPID=";
    link = link + id + "&isArabic=" + isArabaic;
    console.log(link);
    return this.http
      .get(link)
      .map(x => {
        return <SerResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getindices(id: string): Observable<SerResponse> {
    this.getsecurelink();
    let link = this.link + "apis/market/GetIndices?IID=";
    link = link + id;
    console.log(link);
    return this.http
      .get(link)
      .map(x => {
        return <SerResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getperformerstable(): Observable<MarketResponse> {
    this.getsecurelink();
    return this.http
      .get(this.link + "apis/market/GetPerformersTable")
      .map(x => {
        return <MarketResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getindicestable(): Observable<MarketResponse> {
    this.getunsecurelink();
    return this.http
      .get(this.link + "apis/market/GetIndicesTable")
      .map(x => {
        return <MarketResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
}
