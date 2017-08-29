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
  userorderresponse,
  userorder,
  OrderSide,
  OrderStatus,
  PriceType,
  TimeTerm
} from "./userorder.interface";
import { ValidationResponse, CancelResponse } from "./Validate.interface";
@Injectable()
export class TradeService extends ParentService {
  GetPortfolioSummary(token: token): Observable<Detailsresponse> {
    this.getunsecurelink();
    this.link = this.link + "apis/trading/GetPortfolioSummary?bimsid=";
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
    this.getunsecurelink();
    this.link = this.link + "apis/trading/GetUserPortfolio?BimsUserID=";
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
    this.getunsecurelink();
    this.link = this.link + "apis/trading/GetUserOrderHistory?bimsUserID=";
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
    this.getunsecurelink();
    // htis.getlink();
    this.link = this.link + "apis/trading/GetUserOrders?BimsUserID=";
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
  PlaceOrder(
    isArabic: boolean,
    UpdateOrder: boolean,
    order: userorder,
    token: token,
    Pin: number
  ): Observable<ValidationResponse> {
    this.getunsecurelink();
    this.link =
      this.link +
      "apis/trading/PlaceOrder?isArabic=" +
      isArabic +
      "&updateOrder=" +
      UpdateOrder +
      "&pinCode=" +
      Pin;
    // console.log(link);
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    console.log(this.link);
    let value =
      "username=" +
      token.result.UserName +
      "&token=" +
      encodeURIComponent(token.result.Token);
    let body =
      "Order={PriceType:'" +
      PriceType[order.PriceType] +
      "'," +
      "TimeTerm:'" +
      TimeTerm[order.TimeTerm] +
      "'," +
      "BimsUserID:" +
      order.BimsUserID +
      ",ReutersCode:'" +
      order.ReutersCode +
      "',Side:'" +
      OrderSide[order.Side] +
      "',Price:" +
      order.Price +
      ",Quantity:" +
      order.Quantity +
      ",Username:'" +
      order.Username +
      "',ID:" +
      order.ID +
      ",BimsID:" +
      order.BimsID +
      ",Status:'" +
      OrderStatus[order.Status] +
      "',ExecutedQuantity:" +
      order.ExecutedQuantity +
      "}&" +
      value;
    console.log(body);
    return this.http
      .post(this.link, body, { headers: headers })
      .map(x => {
        return <ValidationResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  ValidateOrder(
    isArabic: boolean,
    UpdateOrder: boolean,
    order: userorder,
    token: token
  ): Observable<ValidationResponse> {
    this.getunsecurelink();
    this.link =
      this.link +
      "apis/trading/ValidatePlaceOrder?isArabic=" +
      isArabic +
      "&updateOrder=" +
      UpdateOrder;
    //console.log(link);
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    console.log(this.link);
    let value =
      "username=" +
      token.result.UserName +
      "&token=" +
      encodeURIComponent(token.result.Token);
    let body =
      "Order={PriceType:'" +
      PriceType[order.PriceType] +
      "'," +
      "TimeTerm:'" +
      TimeTerm[order.TimeTerm] +
      "'," +
      "BimsUserID:" +
      order.BimsUserID +
      ",ReutersCode:'" +
      order.ReutersCode +
      "',Side:'" +
      OrderSide[order.Side] +
      "',Price:" +
      order.Price +
      ",Quantity:" +
      order.Quantity +
      ",Username:'" +
      order.Username +
      "',ID:" +
      order.ID +
      ",BimsID:" +
      order.BimsID +
      ",Status:'" +
      OrderStatus[order.Status] +
      "',ExecutedQuantity:" +
      order.ExecutedQuantity +
      "}&" +
      value;
    console.log(body);
    return this.http
      .post(this.link, body, { headers: headers })
      .map(x => {
        return <ValidationResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  CancelOrder(
    orderid: number,
    isArabic: boolean,
    pin: number,
    token
  ): Observable<CancelResponse> {
    this.getunsecurelink();
    this.link =
      this.link +
      "apis/trading/CancelOrder?orderID=" +
      orderid +
      "&isArabic=" +
      isArabic +
      "&pinCode=" +
      pin;
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let value =
      "username=" +
      token.result.UserName +
      "&token=" +
      encodeURIComponent(token.result.Token);
    return this.http
      .post(this.link, value, { headers: headers })
      .map(x => {
        return <CancelResponse>x.json();
      })
      .catch((t: Response) => t.json());
    // 312true12312';
  }
}
