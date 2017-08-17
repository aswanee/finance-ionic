import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http , Response} from '@angular/http';
// import {Rouiter} from './models/rouiter.model';
import {News} from './news.interface';
import {Newsbody} from './newsbody.interface';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {  OnInit } from '@angular/core';
import {Detailsresponse} from './details.interface';
import {MarketDetails} from './marketsummary.interface';
@Injectable()
export class GetService {
  // Comapnies: Rouiter[]= new Array();
  constructor (private http: Http) {

  }
  getmarketsummary(): Observable<MarketDetails> {
      return this.http
      .get('https://www.arabfinance.com/apis/market/GetMarketSummary?Schema=false')
      .map( x => {
      return  <MarketDetails>x.json();
    }).catch((t: Response) => t.json());
  }

   getquotetrades(code: string, id: number): Observable<Detailsresponse> {
 let link = 'https://www.arabfinance.com/apis/market/QuoteTrades?Code=';
  link = link + code + '&lID=' + id ;
     console.log(link);
      return this.http
      .get(link)
      .map( x => {
        console.log(x);
      return  <Detailsresponse> x.json();
    }).catch((t: Response) => t.json());
  }
   getmarketdetails(cid: number= 1): Observable<Detailsresponse> {
 let link = 'https://www.arabfinance.com/apis/market/GetMarketInformation?CID=';
  link = link + cid ;
     console.log(link);
      return this.http
      .get(link)
      .map( x => {
      return  <Detailsresponse>x.json();
    }).catch((t: Response) => t.json());
  }
}
