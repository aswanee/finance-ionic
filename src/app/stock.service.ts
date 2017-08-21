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
export class StockService extends ParentService implements OnInit {
  stocks: Stock;
  objs: Stock[] = new Array();
  // nameobj: string [][] = new Array() ;
  substrings: string[] = new Array();
  names: string[] = new Array();
  ngOnInit() {
    //  this.getnames().subscribe(data  => {this.nameobj = data;
    //         console.log(this.nameobj);
    //         // this.names = this.nameobj.V;
    //        }, Error => console.log(Error) );
    //  this.getstock().subscribe(data  => {this.stocks = data;
    //         this.objs.push(this.stocks);
    //         // this.values = this.dummy;
    //         // console.log(this.objs);
    //        } );
  }
  getstock(nameobj: string[], isArabic: boolean): Observable<SerResponse> {
    // console.log(nameobj.length);
    this.getlink();
    this.link = this.link + "GetSimpleQuotesDetails?Codes=";
    for (let i = 0; i < nameobj.length - 1; i++) {
      this.link = this.link + nameobj[i] + ",";
    }
    // console.log(this.nameobj); // egts,amer,orwe;
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
    this.getlink();
    let temp = "";
    temp = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    this.link =
      this.link +
      "GetSimpleQuotesDetailsWithLastUpdated?Codes=" +
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
    this.getlink();
    this.link =
      this.link + "GetQuoteDetails?Code=" + nameobj + "&isArabic=" + isArabic;
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
    this.getlink();
    //  for (let i = 0 ; i < nameobj.length - 1 ; i++) {
    //       link = link + nameobj[i] + ',';
    //  }
    // console.log(this.nameobj) egts,amer,orwe;
    let temp = "";
    temp = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    this.link =
      this.link +
      "GetQuotesDetails?Codes=" +
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
    this.getlink();
    this.link = this.link + "GetQuotesList?isArabic=" + isArabic;
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
    // console.log(nameobj.length);
    this.getlink();
    let temp1 = "";
    temp1 = from.getFullYear() + "-" + from.getMonth() + "-" + from.getDate();
    let temp2 = "";
    temp2 = to.getFullYear() + "-" + to.getMonth() + "-" + to.getDate();
    this.link =
      this.link +
      "GetSimpleChartWithinRange?Codes=" +
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
