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
import { ToastController } from "ionic-angular";
import { TradeService } from "./../../app/trade.service";
// import { language, isArabic } from "./../../app/app.module";
import { session ,User} from "../../app/session.interface";
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
  Session: session;
  orderid: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private TradeService: TradeService,
    private toastCtrl: ToastController
  ) {
    this.orderid = navParams.get("orderid");
    this.Session = navParams.get("Session");
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
      .getorderhistory(this.Session, window["isArabic"], orderid)
      .subscribe(
        data => {
          this.userorderhistoryresponse = data;
          if (this.userorderhistoryresponse.Status =="UnauthorizedOrOverrideToken") {
            throw "UnauthorizedOrOverrideToken"; 
          }
        },
        Error =>{
          throw Error; 
        }
      );
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
  ErrorToast() {
    let toast = this.toastCtrl.create({
      message: "Error!",
      duration: 2000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
