import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";
import { SerResponse } from "./response.interface";
import { MarketResponse } from "./Marketresponse.interface";
import { ParentService } from "./parentservice.service";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MarketService extends ParentService {
  getperformers(id: string, isArabaic: boolean): Observable<SerResponse> {
    this.getunsecurelink();
    let link = this.link + "apis/market/GetPerformers?TPID=";
    link = link + id + "&isArabic=" + isArabaic;
    return this.http
      .get(link)
      .map(x => {
        return <SerResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getindices(id: string): Observable<SerResponse> {
    this.getunsecurelink();
    let link = this.link + "apis/market/GetIndices?IID=";
    link = link + id;
    return this.http
      .get(link)
      .map(x => {
        return <SerResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getperformerstable(): Observable<MarketResponse> {
    this.getunsecurelink();
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



  MarketStatus :{Status:string, Time:string, Datetime : Date} = {Status:"CLOSE", Time:"00000",Datetime: new Date()};

  // private subject = new Subject<any>();
  
  // getMessage(): Observable<any> {
  //   return this.subject.asObservable();
  // }



  getmarketstatus(): Observable<any> {
    this.getunsecurelink();
    return this.http 
      .get(this.link + "apis/market/GetMarketStatus")
      .map(x => {
        var data = <any>x.json();
        if(data && data.result){
          this.MarketStatus.Status = data.result.MarketStatuse;
          this.MarketStatus.Datetime = this.JsonToDate(data.result.RegTime);
          this.MarketStatus.Time =  this.MarketStatus.Datetime.toLocaleTimeString();  
        }
        return this.MarketStatus;
      })
      .catch(error => Observable.throw(error));
      //.catch((t: Response) => t.json());
  }

  JsonToDate (param):Date{
    return new Date(parseInt(param.substr(6)));
  }
}
