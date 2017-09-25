import { OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { Stock } from "./stock.interface";
// import {Names} from './models/names.interface';
import { SerResponse } from "./response.interface";
import { Detailsupdateresponse } from "./detailsupdateresponse.interface";
import { Detailsresponse } from "./details.interface";
import { Chartobjectresponse } from "./chartobjresponse.interface";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { ParentService } from "./parentservice.service";
@Injectable()
export class StockService extends ParentService {
  stocks: Stock;
  objs: Stock[] = new Array();
  // nameobj: string [][] = new Array() ;
  substrings: string[] = new Array();
  names: string[] = new Array();

  getstock(nameobj: string[], isArabic: boolean): Observable<SerResponse> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetSimpleQuotesDetails?Codes=";

    for (let i = 0; i < nameobj.length - 1; i++) {
      this.link = this.link + nameobj[i] + ",";
    }
    this.link =
      this.link + nameobj[nameobj.length - 1] + "&isArabic=" + isArabic;
    console.log(this.link);
    return this.http
      .get(this.link)
      .map(x => {
        return <SerResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getstockwithupdate(nameobj: string, date: Date): Observable<SerResponse> {
    this.getunsecurelink();
    let temp = "";
    temp = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    this.link =
      this.link +
      "apis/market/GetSimpleQuotesDetailsWithLastUpdated?Codes=" +
      nameobj +
      "&lastUpdated=" +
      temp;
    return this.http
      .get(this.link)
      .map(x => {
        return <SerResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getstockdetails(
    nameobj: string,
    isArabic: boolean
  ): Observable<Detailsresponse> {
    this.getunsecurelink();
    this.link =
      this.link +
      "apis/market/GetQuoteDetails?Code=" +
      nameobj +
      "&isArabic=" +
      isArabic;
    return this.http
      .get(this.link)
      .map(x => {
        return <Detailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getstockdetailswithupdate(
    nameobj: string,
    isArabic: boolean,
    date: Date
  ): Observable<Detailsupdateresponse> {



    
    this.getunsecurelink();
    let temp = "";
    temp =
      date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate();
    this.link =
      this.link +
      "apis/market/GetQuotesDetails?Codes=" +
      nameobj +
      "&isArabic=" +
      isArabic +
      "&lastUpdated=" +
      temp;
    console.log(this.link);
    return this.http
      .get(this.link)
      .map(x => {
        return <Detailsupdateresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getnames(isArabic: boolean): Observable<SerResponse> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetQuotesList?isArabic=" + isArabic;
    return (
      this.http
        .get(this.link)
        // .get('./../assets/cmps.json')
        .map(x => <SerResponse>x.json())
        .catch((t: Response) => t.json())
    );
  }
  getchart(
    codes: string,
    from: Date,
    to: Date,
    isIntra: number
  ): Observable<Chartobjectresponse> {
    this.getunsecurelink();
    let temp1 = "";
    temp1 = from.getFullYear() + "-" + from.getMonth() + "-" + from.getDate();
    let temp2 = "";
    temp2 = to.getFullYear() + "-" + to.getMonth() + "-" + to.getDate();
    this.link =
      this.link +
      "apis/market/GetSimpleChartWithinRange?Codes=" +
      codes +
      "&from=" +
      temp1 +
      "&to=" +
      temp2 +
      "&isIntra=" +
      isIntra;
    return this.http
      .get(this.link)
      .map(x => {
        return <Chartobjectresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
}
