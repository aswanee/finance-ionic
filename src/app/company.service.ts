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
import {Newsresponse} from './newsresponse.interface';
import {Newsdetailsresponse} from './newsdetailsresponse.interface';
@Injectable()
export class CompanyService {
  // Comapnies: Rouiter[]= new Array();
  constructor (private http: Http) {

  }
  getnews(date: Date, count: number, isArabic: boolean): Observable<Newsresponse> {
 let link = 'https://www.arabfinance.com/apis/market/GetNews?lastPostingTime=';
 let temp = '';
 temp = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    link = link + temp + '&count=' + count + '&isArabic=' + isArabic;
     console.log(link);
      return this.http
      .get(link)
      .map( x => {
      return  <Newsresponse>x.json();
    }).catch((t: Response) => t.json());
  }

   getnewsdetails(id: number): Observable<Newsdetailsresponse> {
 let link = 'https://www.arabfinance.com/apis/market/GetNewsDetails?newsId=';
  link = link + id ;
     console.log(link);
      return this.http
      .get(link)
      .map( x => {
      return  <Newsdetailsresponse>x.json();
    }).catch((t: Response) => t.json());
  }
  getnewsrelated(id: string): Observable<Newsresponse> {
 let link = 'http://staging5.arabfinance.com/apis/market/GetNewsRelatedTo?Code=';
  link = link + id ;
     console.log(link);
      return this.http
      .get(link)
      .map( x => {
      return  <Newsdetailsresponse>x.json();
    }).catch((t: Response) => t.json());
  }
}

