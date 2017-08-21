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
    date: Date,
    count: number,
    isArabic: boolean
  ): Observable<Newsresponse> {
    this.getlink();
    let temp = "";
    temp = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    this.link =
      this.link +
      "GetNews?lastPostingTime=" +
      temp +
      "&count=" +
      count +
      "&isArabic=" +
      isArabic;
    return this.http
      .get(this.link)
      .map(x => {
        return <Newsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getnewsdetails(id: number): Observable<Newsdetailsresponse> {
    this.getlink();
    this.link = this.link + "GetNewsDetails?newsId=" + id;
    console.log(this.link);
    return this.http
      .get(this.link)
      .map(x => {
        return <Newsdetailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getnewsrelated(id: string): Observable<Newsresponse> {
    this.getlink();
    this.link = this.link + "GetNewsRelatedTo?Code=" + id;
    console.log(this.link);
    return this.http
      .get(this.link)
      .map(x => {
        return <Newsdetailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
}
