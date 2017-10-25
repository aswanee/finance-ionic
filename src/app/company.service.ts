import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
// import {Rouiter} from './models/rouiter.model';
import { News } from "./news.interface";
import { Newsbody } from "./newsbody.interface";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { OnInit } from "@angular/core";
import { Newsresponse } from "./newsresponse.interface";
import { Newsdetailsresponse } from "./newsdetailsresponse.interface";
import { ParentService } from "./parentservice.service";
@Injectable()
export class CompanyService extends ParentService {
  // Comapnies: Rouiter[]= new Array();

  getnews(
    strDate: string,
    count: number,
    nLang:number
  ): Observable<Newsresponse> {
    this.getunsecurelink();
    this.link =
      this.link +
      "apis/market/GetNews?lastPostingTime=" +
      strDate +
      "&count=" +
      count +
      "&nlang=" + 
      nLang;
    return this.http
      .get(this.link)
      .map(x => {
        return <Newsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getnewsRange(
    //from: Date,
    tempto: string,
    count: number,
    nLang:number
  ): Observable<Newsresponse> {
    this.getunsecurelink();
    //let tempfrom = from.getFullYear() + "-" + (from.getMonth() + 1) + "-" + from.getDate();
    this.link =
      this.link +
      "apis/market/GetNewsWithRange?to=" +
      tempto +
      //"%2011:10&from=" +
      //tempfrom +
      "&count=" +
      count +
      "&nlang=" +
      nLang;
    return this.http
      .get(this.link)
      .map(x => {
        return <Newsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  
  getnewsdetails(id: number): Observable<Newsdetailsresponse> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetNewsDetails?newsId=" + id;
    return this.http
      .get(this.link)
      .map(x => {
        return <Newsdetailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getnewsrelated(id: string,isArabic:boolean): Observable<Newsresponse> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetNewsRelatedTo?Code=" + id + "&isArabic=" + isArabic;

    return this.http
      .get(this.link)
      .map(x => {
        return <Newsdetailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  OldFavoriteNewsID:string="0";

  GetFavoriteNews(userid : string): Observable<Newsresponse> {
    this.getunsecurelink();
    //let tempfrom = from.getFullYear() + "-" + (from.getMonth() + 1) + "-" + from.getDate();
    this.link += "apis/market/GetFavoriteNews?userid=" + userid + "&id=" + this.OldFavoriteNewsID ;
    return this.http
      .get(this.link)
      .map(x => {
        var favs = <Newsresponse>x.json();
        this.OldFavoriteNewsID = favs.result.N
        return favs;
      })
      .catch((t: Response) => t.json());
  }
  

}
