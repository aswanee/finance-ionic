import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { token } from "./token.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { ParentService } from "./parentservice.service";
import { Detailsresponse } from "./details.interface";
import { portfolioresponse } from "./portfolio.interface";
import {
  userorderhistoryresponse,
  userorderresponse
} from "./userorder.interface";
@Injectable()
export class TradeService extends ParentService {
  GetPortfolioSummary(token: token): Observable<Detailsresponse> {
    // htis.getlink();
    this.link =
      "http://staging5.arabfinance.com/apis/trading/GetPortfolioSummary?bimsid=";
    // console.log(link);
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let useraccounts = token.result.UserAccounts.length;
    if (useraccounts === 0) {
      this.link = this.link + token.result.BIMSIAccountNumber;
    } else {
      this.link = this.link + token.result.UserAccounts[0];
    }
    console.log(this.link);
    let body =
      "username=" +
      token.result.UserName +
      "&token=" +
      encodeURIComponent(token.result.Token);
    return this.http
      .post(this.link, body, { headers: headers })
      .map(x => {
        return <Detailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  GetPortfolio(token: token, isArabic: boolean): Observable<portfolioresponse> {
    // htis.getlink();
    this.link =
      "http://staging5.arabfinance.com/apis/trading/GetUserPortfolio?BimsUserID=";
    // console.log(link);
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let useraccounts = token.result.UserAccounts.length;
    if (useraccounts === 0) {
      this.link =
        this.link + token.result.BIMSIAccountNumber + "&isArabic=" + isArabic;
    } else {
      this.link =
        this.link + token.result.UserAccounts[0] + "&isArabic=" + isArabic;
    }

    console.log(this.link);
    let body =
      "username=" +
      token.result.UserName +
      "&token=" +
      encodeURIComponent(token.result.Token);
    return this.http
      .post(this.link, body, { headers: headers })
      .map(x => {
        return <portfolioresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getorderhistory(
    token: token,
    isArabic: boolean,
    orderid: number
  ): Observable<userorderhistoryresponse> {
    // htis.getlink();
    this.link =
      "http://staging5.arabfinance.com/apis/trading/GetUserOrderHistory?bimsUserID=";
    // console.log(link);
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let useraccounts = token.result.UserAccounts.length;
    if (useraccounts === 0) {
      this.link =
        this.link +
        token.result.BIMSIAccountNumber +
        "&orderID=" +
        orderid +
        "&isArabic=" +
        isArabic;
    } else {
      this.link =
        this.link +
        token.result.UserAccounts[0] +
        "&orderID=" +
        orderid +
        "&isArabic=" +
        isArabic;
    }

    console.log(this.link);
    let body =
      "username=" +
      token.result.UserName +
      "&token=" +
      encodeURIComponent(token.result.Token);
    return this.http
      .post(this.link, body, { headers: headers })
      .map(x => {
        return <userorderhistoryresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getorders(
    token: token,
    isArabic: boolean,
    view: number
  ): Observable<userorderresponse> {
    // htis.getlink();
    this.link =
      "http://staging5.arabfinance.com/apis/trading/GetUserOrders?BimsUserID=";
    // console.log(link);
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let useraccounts = token.result.UserAccounts.length;
    if (useraccounts === 0) {
      this.link =
        this.link +
        token.result.BIMSIAccountNumber +
        "&view=" +
        view +
        "&isArabic=" +
        isArabic;
    } else {
      this.link =
        this.link +
        token.result.UserAccounts[0] +
        "&view=" +
        view +
        "&isArabic=" +
        isArabic;
    }

    console.log(this.link);
    let body =
      "username=" +
      token.result.UserName +
      "&token=" +
      encodeURIComponent(token.result.Token);
    return this.http
      .post(this.link, body, { headers: headers })
      .map(x => {
        return <userorderresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
}
