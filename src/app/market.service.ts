import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http , Response} from '@angular/http';
import {SerResponse} from './response.interface';
import {MarketResponse} from './Marketresponse.interface';
@Injectable()
export class MarketService {
  constructor(private http:Http){

  }
  getperformers(id: string, isArabaic:boolean): Observable<SerResponse> {
     let link = 'https://www.arabfinance.com/apis/market/GetPerformers?TPID=';
     link = link + id + '&isArabic=' + isArabaic;
     console.log(link);
      return this.http
      .get(link)
      .map( x => {
      return  <SerResponse>x.json();
    }).catch((t: Response) => t.json());
  }
    getindices(id: string): Observable<SerResponse> {
     let link = 'https://www.arabfinance.com/apis/market/GetIndices?IID=';
     link = link + id ;
     console.log(link);
      return this.http
      .get(link)
      .map( x => {
      return  <SerResponse>x.json();
    }).catch((t: Response) => t.json());
  }
  getperformerstable(): Observable<MarketResponse> {
    return this.http
      .get("https://www.arabfinance.com/apis/market/GetPerformersTable")
      .map( x => {
      return  <MarketResponse>x.json();
    }).catch((t: Response) => t.json());
  }
  getindicestable(): Observable<MarketResponse> {

      return this.http
      .get("https://www.arabfinance.com/apis/market/GetIndicesTable")
      .map( x => {
      return  <MarketResponse>x.json();
    }).catch((t: Response) => t.json());
  }
}
