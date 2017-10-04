//export let isArabic: boolean = false;
import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TradeService } from "./../../app/trade.service";
import {
  userorderhistoryresponse,
  userorderresponse,
  userorder,
  OrderSide,
  OrderStatus,
  TimeTerm,
  PriceType
} from "./../../app/userorder.interface";
import { Storage } from "@ionic/storage";

import {
  ValidationResponse,
  CancelResponse
} from "./../../app/Validate.interface";
import { Detailsresponse } from "./../../app/details.interface";
import { portfolioresponse } from "./../../app/portfolio.interface";
import { USERTOKEN } from "./../login/login.component";
import { LoginService } from "./../../app/login.service";
import { token } from "./../../app/token.interface";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
import { HomePage } from "./../WatchList/WatchList";
import { StockService } from "./../../app/stock.service";
import { Platform } from "ionic-angular";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage implements OnInit {
  pepperoni;
  sausage;
  mushrooms;
  userorderhistoryresponse: userorderhistoryresponse;
  userorderresponse: userorderresponse;
  portfolioresponse: portfolioresponse;
  Detailsresponse: Detailsresponse;
  //lang: string;
  openlanguage: boolean = false;
  showabout = false;
  ValidationResponse: ValidationResponse;
  usertoken: token;
  userorder: userorder = {
    PriceType: 2 /*Market -  Limited*/,
    TimeTerm: 2 /*2- Good Till Day -4 Good Till week -5 Good Till month*/,
    BimsUserID: 0,
    ReutersCode: "",
    Side: 1 /*(2)Buy -(3) Sell -(4) Sell Same Day -(5) T+1*/,
    Price: 0,
    Quantity: 1,
    Username: "",
    CurrencyCode: "",
    Status: 1 /*(1)Open, (2)Completed, (3)Expired, (4)Cancelled, (5)Partially Executed, (6)Pending Approval, (7)Rejected, (8)Suspended, (9)Invalid Order, (-2)Cancelled With Error*/,
    ExecutedQuantity: 0,
    details: [],
    ID: 0,
    BimsID: 0,
    OrderDate: "/Date(1503913325113)/",
    SymbolCode: "",
    ExpireAt: "/Date(1503871200000)/",
    BkeeperID: 4527,
    OrderReference: "",
    strOrderDate: new Date("2017-08-28T11:42:05.05"),
    strExpireAt: new Date("2017-08-28T00:00:00.00")
  };
 
  CancelResponse: CancelResponse;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private TradeService: TradeService,
    private LoginService: LoginService,
    private storage: Storage,
    private StockService: StockService,
    private platform: Platform
    
    
  ) {}
  ngOnInit() {
  }
  ionViewDidLoad() {
  }
  toarab() {

    window["language"] = "ar";
    localStorage.setItem('language', 'ar');

    window["isArabic"] = true;
    localStorage.setItem('isArabic', "true");
    this.StockService.getnames(true).subscribe();
    this.platform.setDir('rtl', true)
    
  }

  toen() {
    window["language"] = "en";
    localStorage.setItem('language', 'en');

    window["isArabic"] = false;
    localStorage.setItem('isArabic', "false");
    this.StockService.getnames(false).subscribe();
    this.platform.setDir('ltr', true)
    
  }
  setopenlang() {
    this.openlanguage = !this.openlanguage;
  }
  setshowabout() {
    this.showabout = !this.showabout;
  }

}

