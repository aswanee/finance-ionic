export let language: string = "en";
export let isArabic: boolean = false;
import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TranslateService, TranslatePipe } from "ng2-translate";
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
import {
  ValidationResponse,
  CancelResponse
} from "./../../app/Validate.interface";
import { Detailsresponse } from "./../../app/details.interface";
import { portfolioresponse } from "./../../app/portfolio.interface";
import { USERTOKEN } from "./../login/login.component";
import { LoginService } from "./../../app/login.service";
import { token } from "./../../app/token.interface";
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
  language: string;
  openlanguage: boolean = false;
  showabout = false;
  ValidationResponse: ValidationResponse;
  usertoken: token;
  userorder: userorder = {
    PriceType: 2 /*Market -  Limited*/,
    TimeTerm: 4 /*2- Good Till Day -4 Good Till week -5 Good Till month*/,
    BimsUserID: 156001,
    ReutersCode: "EGTS",
    Side: 1 /*(2)Buy -(3) Sell -(4) Sell Same Day -(5) T+1*/,
    Price: 0.97,
    Quantity: 5,
    Username: "wesimy",
    CurrencyCode: "EGP",
    Status: 1 /*(1)Open, (2)Completed, (3)Expired, (4)Cancelled, (5)Partially Executed, (6)Pending Approval, (7)Rejected, (8)Suspended, (9)Invalid Order, (-2)Cancelled With Error*/,
    ExecutedQuantity: 0,
    details: [],
    ID: 630912,
    BimsID: 70035638,
    OrderDate: "/Date(1503913325113)/",
    SymbolCode: "EGS70431C019",
    ExpireAt: "/Date(1503871200000)/",
    BkeeperID: 4527,
    OrderReference: "20170828-175629127",
    strOrderDate: new Date("2017-08-28T11:42:05.05"),
    strExpireAt: new Date("2017-08-28T00:00:00.00")
  };
  CancelResponse: CancelResponse;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private TranslateService: TranslateService,
    private TradeService: TradeService,
    private LoginService: LoginService
  ) {}
  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    // this.LoginService.gettoken("hkh", "Otv@1234").subscribe(data => {
    //   this.usertoken = data;
    //   console.log(this.usertoken);
    // });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingsPage");
  }
  toarab() {
    this.language = "ar";
    isArabic = true;
    language = this.language;
    this.TranslateService.use(this.language);
    // this.TradeService
    //   .CancelOrder(630914, true, 123456, this.usertoken)
    //   .subscribe(data => {
    //     this.CancelResponse = data;
    //     console.log(this.CancelResponse);
    //   });
  }

  toen() {
    this.language = "en";
    isArabic = false;
    language = this.language;
    this.TranslateService.use(this.language);
  }
  setopenlang() {
    this.openlanguage = !this.openlanguage;
  }
  setshowabout() {
    this.showabout = !this.showabout;
  }
}
//  {
//     PriceType: 2 /*Market -  Limited*/,
//     TimeTerm: 2 /*2- Good Till Day -4 Good Till week -5 Good Till month*/,
//
//     ReutersCode: "EGTS",
//     Side: 1 /*(2)Buy -(3) Sell -(4) Sell Same Day -(5) T+1*/,
//     Price: 0.96,
//     Quantity: 3,

//      BimsUserID: 156001,
//     Username: "wesimy",
//     CurrencyCode: "",
//     Status: 1 /*(1)Open, (2)Completed, (3)Expired, (4)Cancelled, (5)Partially Executed, (6)Pending Approval, (7)Rejected, (8)Suspended, (9)Invalid Order, (-2)Cancelled With Error*/,
//     ExecutedQuantity: 0,
//     details: [],
//     ID: 0,
//     BimsID: 0,
//     OrderDate: null,
//     SymbolCode: "",
//     ExpireAt: null,
//     BkeeperID: 4527,
//     OrderReference: "",
//     strOrderDate: null,
//     strExpireAt: null
//   };
