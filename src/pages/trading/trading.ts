import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TradeService } from "./../../app/trade.service";
import { portfolioresponse } from "./../../app/portfolio.interface";
import {
  userorderhistoryresponse,
  userorderresponse
} from "./../../app/userorder.interface";
import { Detailsresponse } from "./../../app/details.interface";
import { token } from "./../../app/token.interface";
import { LoginService } from "./../../app/login.service";
/**
 * Generated class for the TradingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-trading",
  templateUrl: "trading.html"
})
export class TradingPage implements OnInit {
  token: token;
  userorderhistoryresponse: userorderhistoryresponse;
  userorderresponse: userorderresponse;
  portfolioresponse: portfolioresponse;
  Detailsresponse: Detailsresponse;
  showportfolio: boolean = false;
  showsummary = false;
  showorders = false;
  showhistory = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private LoginService: LoginService,
    private TradeService: TradeService
  ) {}
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.LoginService.gettoken("wesimy", "Otv@1234").subscribe(data => {
      this.token = data;
      console.log(this.token);
    });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad TradingPage");
  }
  getportfolio() {
    this.TradeService.GetPortfolio(this.token, true).subscribe(data => {
      this.portfolioresponse = data;
      console.log(this.portfolioresponse);
    });
    this.showportfolio = !this.showportfolio;
  }
  getportfoliosummary() {
    this.TradeService.GetPortfolioSummary(this.token).subscribe(data => {
      this.Detailsresponse = data;
      console.log(this.portfolioresponse);
    });
    this.showsummary = !this.showsummary;
  }
  getorders() {
    this.TradeService.getorders(this.token, true, 2).subscribe(data => {
      this.userorderresponse = data;
      console.log(this.portfolioresponse);
    });
    this.showorders = !this.showorders;
  }
  getorderhistory(orderid) {
    this.TradeService
      .getorderhistory(this.token, true, orderid)
      .subscribe(data => {
        this.userorderhistoryresponse = data;
        console.log(this.portfolioresponse);
      });
    this.showhistory = !this.showhistory;
  }
}
