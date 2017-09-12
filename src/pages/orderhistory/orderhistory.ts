import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  userorderhistory,
  userorderhistoryresponse,
  PlaceType,
  OrderStatus,
  PriceType,
  OrderSide
} from "./../../app/userorder.interface";
import { TradeService } from "./../../app/trade.service";
// import { language, isArabic } from "./../../app/app.module";
import { token } from "./../../app/token.interface";
import { LoginComponent } from "./../login/login.component";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
/**
 * Generated class for the OrderhistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-orderhistory",
  templateUrl: "orderhistory.html"
})
export class OrderhistoryPage implements OnInit {
  userorderhistoryresponse: userorderhistoryresponse;
  token: token;
  orderid: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private TradeService: TradeService
  ) {
    this.orderid = navParams.get("orderid");
    this.token = navParams.get("token");
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getorderhistory(this.orderid);
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad OrderhistoryPage");
  }
  getorderhistory(orderid) {
    this.TradeService
      .getorderhistory(this.token, window["isArabic"], orderid)
      .subscribe(
        data => {
          this.userorderhistoryresponse = data;
          console.log(this.userorderhistoryresponse);
          if (
            this.userorderhistoryresponse.Status ==
            "UnauthorizedOrOverrideToken"
          ) {
            window["token"] = null;
            this.gotoLogin();
          }
        },
        Error =>
          alert(
            "Error! Please Check your Connectivity and restart the application"
          )
      );
  }
  gotoLogin() {
    // check when he comes bach if he did login
    //this.checkLogin();
    if (this.token == null) {
      this.navCtrl.push(LoginComponent);
    }
  }

  showOrderStatus(Status: OrderStatus): string {
    return OrderStatus[Status];
  }
  showOrderSide(Side: OrderSide): string {
    return OrderSide[Side];
  }
  showPriceType(Price: PriceType): string {
    return PriceType[Price];
  }
  showPlaceType(Place: PlaceType) {
    return PlaceType[Place];
  }
}
