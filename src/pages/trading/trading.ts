import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TradeService } from "./../../app/trade.service";
import { portfolioresponse } from "./../../app/portfolio.interface";
import { AlertController } from "ionic-angular";
import { LoginComponent } from "./../login/login.component";

import {
  userorderhistoryresponse,
  userorderresponse,
  userorder,
  checkupdatability,
  TimeTerm,
  OrderSide,
  OrderStatus,
  PriceType
} from "./../../app/userorder.interface";
import {
  ValidationResponse,
  CancelResponse,
  OrderOperationResult,
  Place,
  PlaceOrderStatus,
  PlaceResponse
} from "./../../app/Validate.interface";
import { Detailsresponse } from "./../../app/details.interface";
import { token } from "./../../app/token.interface";
import { LoginService } from "./../../app/login.service";
import { Storage } from "@ionic/storage";
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
  pincode: number = 0;
  showhistory = false;
  userorder: userorder = {
    PriceType: 0 /*Market -  Limited*/,
    TimeTerm: 0 /*2- Good Till Day -4 Good Till week -5 Good Till month*/,
    BimsUserID: 0,
    ReutersCode: "",
    Side: 0 /*(2)Buy -(3) Sell -(4) Sell Same Day -(5) T+1*/,
    Price: 0,
    Quantity: 0,
    Username: "",
    CurrencyCode: "EGP",
    Status: 1 /*(1)Open, (2)Completed, (3)Expired, (4)Cancelled, (5)Partially Executed, (6)Pending Approval, (7)Rejected, (8)Suspended, (9)Invalid Order, (-2)Cancelled With Error*/,
    ExecutedQuantity: 0,
    details: [],
    ID: 0,
    BimsID: 0,
    OrderDate: null,
    SymbolCode: "",
    ExpireAt: null,
    BkeeperID: 4527,
    OrderReference: "",
    strOrderDate: null,
    strExpireAt: null
  };

  updateuserorder: userorder = {
    PriceType: 0 /*Market -  Limited*/,
    TimeTerm: 0 /*2- Good Till Day -4 Good Till week -5 Good Till month*/,
    BimsUserID: 0,
    ReutersCode: "",
    Side: 0 /*(2)Buy -(3) Sell -(4) Sell Same Day -(5) T+1*/,
    Price: 0,
    Quantity: 0,
    Username: "",
    CurrencyCode: "EGP",
    Status: 1 /*(1)Open, (2)Completed, (3)Expired, (4)Cancelled, (5)Partially Executed, (6)Pending Approval, (7)Rejected, (8)Suspended, (9)Invalid Order, (-2)Cancelled With Error*/,
    ExecutedQuantity: 0,
    details: [],
    ID: 0,
    BimsID: 0,
    OrderDate: null,
    SymbolCode: "",
    ExpireAt: null,
    BkeeperID: 4527,
    OrderReference: "",
    strOrderDate: null,
    strExpireAt: null
  };
  ValidationResponse: ValidationResponse;
  Updateresponse: PlaceResponse;
  Createresponse: PlaceResponse;
  CancelResponse: CancelResponse;
  showInsert = false;
  ShowUpdate: boolean[] = new Array();
  EnablePrice = true;
  timeout: number;
  loggedIn: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private LoginService: LoginService,
    private TradeService: TradeService,
    private storage: Storage,
    public alertCtrl: AlertController
  ) {
    setTimeout(() => {
      if (!this.loggedIn) {
        this.showAlert();
      }
    }, 1000);
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.LoginService.gettoken("hkh", "Otv@1234").subscribe(data => {
    //   this.token = data;
    //   console.log(this.token);
    // });
    this.storage.keys().then(keys => {
      if (keys) {
        keys.forEach(key => {
          if (key === "token") {
            this.storage.get(key).then(val => {
              this.setLoggedIn();
              this.token = val;
              console.log(this.token);
            });
          }
        });
      }
    });
  }

  setLoggedIn() {
    this.loggedIn = true;
  }

  checkLogin() {
    this.storage.keys().then(keys => {
      if (keys) {
        keys.forEach(key => {
          if (key === "token") {
            this.storage.get(key).then(val => {
              this.setLoggedIn();
              this.token = val;
              console.log(this.token);
            });
          }
        });
      }
    });
  }

  gotoLogin() {
    this.navCtrl.push(LoginComponent);
    // check when he comes bach if he did login
    this.checkLogin();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: "Not a user!",
      subTitle: "You are not logged in!",
      buttons: [
        {
          text: "Login",
          handler: data => {
            this.navCtrl.push(LoginComponent);
          }
        },
        {
          text: "Cancel",
          handler: data => {}
        }
      ]
    });
    alert.present();
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
    this.showorders = false;
    this.showhistory = false;
    this.showInsert = false;
    // this.ShowUpdate = false;
  }
  getportfoliosummary() {
    this.TradeService.GetPortfolioSummary(this.token).subscribe(data => {
      this.Detailsresponse = data;
      console.log(this.Detailsresponse);
    });
    this.showsummary = !this.showsummary;
  }
  getorders() {
    this.TradeService.getorders(this.token, true, 2).subscribe(data => {
      this.userorderresponse = data;
      console.log(this.userorderresponse);
      for (let i = 0; i < this.userorderresponse.Status.length; i++) {
        this.ShowUpdate[i] = false;
      }
    });
    this.showorders = !this.showorders;
    this.showportfolio = false;
    this.showhistory = false;
    this.showInsert = false;
    // this.ShowUpdate = false;
  }
  getorderhistory(orderid) {
    this.TradeService
      .getorderhistory(this.token, true, orderid)
      .subscribe(data => {
        this.userorderhistoryresponse = data;
        console.log(this.userorderhistoryresponse);
      });
    this.showhistory = !this.showhistory;
    this.showportfolio = false;
    this.showorders = false;
    this.showInsert = false;
    for (let i = 0; i < this.userorderresponse.Status.length; i++) {
      this.ShowUpdate[i] = false;
    }
    this.showsummary = false;
  }
  CreateUpdateOrder() {
    // this.InitializeUserOrder();
    if (this.EnablePrice) {
      // this.userorder.Price = Number(
      //   document.getElementById("Price").textContent
      // );
    } else {
      this.userorder.Price = 0;
    }
    // this.userorder.Quantity = Number(
    //   document.getElementById("Quantity").textContent
    // );
    // this.userorder.ReutersCode = document.getElementById("Code").textContent;

    if (this.token.result.UserAccounts.length === 0) {
      this.userorder.BimsUserID = this.token.result.BIMSIAccountNumber;
    } else {
      this.userorder.BimsUserID = Number(this.token.result.UserAccounts[0]);
    }
    this.userorder.Username = this.token.result.UserName;
    console.log(this.userorder);
    this.TradeService
      .ValidateOrder(true, false, this.userorder, this.token)
      .subscribe(data => {
        this.ValidationResponse = data;
        console.log(this.ValidationResponse);
        if (
          this.ValidationResponse.result.Result.toString() ===
          OrderOperationResult[OrderOperationResult.Success]
        ) {
          console.log("order placed");
          this.placeOrder();
          // this.pincode = Number(
          //   prompt(
          //     this.ValidationResponse.result.Message +
          //       "Please enter the Pin code"
          //   )
          // );
          // console.log(this.pincode);
          // setTimeout(function() {

          // }, 5000);
          // this.TradeService
          //   .PlaceOrder(true, false, this.userorder, this.token, 123456)
          //   .subscribe(data => {
          //     this.Createresponse = data;
          //     console.log(this.Createresponse);
          //     prompt(this.Createresponse.result.Message);
          //   });
        } else {
          console.log("order not placed");
          console.log(this.ValidationResponse.result.Result.toString());
          console.log(OrderOperationResult[OrderOperationResult.Success]);
          alert(this.ValidationResponse.result.Message);
        }
      });

    //  console.log(this.pincode);
  }

  placeOrder() {
    this.pincode = Number(prompt("please enter the pin code"));
    this.TradeService
      .PlaceOrder(true, false, this.userorder, this.token, this.pincode)
      .subscribe(data => {
        this.Createresponse = data;
        console.log(this.Createresponse);
        console.log(this.Createresponse);
        alert(this.Createresponse.result.OutMessages);
      });
  }
  UpdateOrder(order: userorder) {
    // console.log(this.userorder);

    this.updateuserorder.Username = this.token.result.UserName;
    // console.log(this.userorder);
    //  console.log(order);
    //  console.log(this.token.result.UserName);
    if (this.EnablePrice) {
    } else {
      this.updateuserorder.Price = 0;
    }
    // order.Quantity = Number(document.getElementById("UQuantity").textContent);
    // order.ReutersCode = document.getElementById("UCode").textContent;
    //order.Username = this.token.result.UserName;
    //this.userorder.BimsUserID = Number(this.token.result.UserAccounts[0]);
    this.TradeService
      .ValidateOrder(true, true, this.updateuserorder, this.token)
      .subscribe(data => {
        this.ValidationResponse = data;
        console.log(this.ValidationResponse);
        if (
          this.ValidationResponse.result.Result.toString() ===
          OrderOperationResult[OrderOperationResult.Success]
        ) {
          this.pincode = Number(
            prompt(
              this.ValidationResponse.result.Message +
                "Please enter the Pin code"
            )
          );
          this.TradeService
            .PlaceOrder(
              true,
              true,
              this.updateuserorder,
              this.token,
              this.pincode
            )
            .subscribe(data => {
              this.Updateresponse = data;
              alert(this.Updateresponse.result.OutMessages);
              console.log(this.Updateresponse);
              console.log(this.Updateresponse.result.Status.toString());
              console.log(PlaceOrderStatus[PlaceOrderStatus.Completed]);
              if (
                this.Updateresponse.result.Status.toString() ===
                PlaceOrderStatus[PlaceOrderStatus.Completed]
              ) {
                order = Object.assign({}, this.updateuserorder);
              }
            });
        } else {
          alert(this.ValidationResponse.result.Message);
        }
      });
  }
  CancelOrder(orderid: number) {
    this.pincode = Number(prompt("please enter your pin code"));
    this.TradeService
      .CancelOrder(orderid, true, this.pincode, this.token)
      .subscribe(data => {
        this.CancelResponse = data;
        console.log(this.CancelResponse);
        alert(this.CancelResponse.result.Message);
      });
  }

  ChooseDay() {
    this.userorder.TimeTerm = TimeTerm.Day;
    this.updateuserorder.TimeTerm = TimeTerm.Day;
    console.log("day");
    console.log(this.userorder.TimeTerm);
  }
  ChooseWeek() {
    this.userorder.TimeTerm = TimeTerm.Week;
    this.updateuserorder.TimeTerm = TimeTerm.Week;
  }
  ChooseMonth() {
    this.userorder.TimeTerm = TimeTerm.Month;
    this.updateuserorder.TimeTerm = TimeTerm.Month;
  }
  ChooseMarket() {
    this.userorder.PriceType = PriceType.Market;
    this.updateuserorder.PriceType = PriceType.Market;
    this.EnablePrice = false;
  }
  ChooseLimit() {
    this.userorder.PriceType = PriceType.Limit;
    this.updateuserorder.PriceType = PriceType.Limit;
    this.EnablePrice = true;
    console.log("limit");
    console.log(this.userorder.PriceType);
  }
  ChooseBuy() {
    this.userorder.Side = OrderSide.Buy;
    this.updateuserorder.Side = OrderSide.Buy;
    console.log(this.userorder.Side);
    console.log("buy");
  }
  ChooseSell() {
    this.userorder.Side = OrderSide.Sell;
    this.updateuserorder.Side = OrderSide.Sell;
  }
  ChooseSellT0() {
    this.userorder.Side = OrderSide.Sell_T0;
    // this.updateuserorder.Side = OrderSide.Sell_T0;
    this.updateuserorder.Side = OrderSide.Sell_T0;
  }
  ChooseSellT1() {
    this.userorder.Side = OrderSide.Sell_T1;
    this.updateuserorder.Side = OrderSide.Sell_T1;
  }
  checkupdatability(userorder: userorder): boolean {
    if (
      userorder.Status === 1 ||
      userorder.Status === 5 ||
      userorder.Status === 6 ||
      userorder.Status === 8
    ) {
      return true;
    } else {
      return false;
    }
  }
  ChangeUpdate(id: number, order: userorder) {
    this.showportfolio = false;
    this.showhistory = false;
    this.showsummary = false;
    this.showInsert = false;
    // this.showorders = false;
    for (let i = 0; i < this.userorderresponse.Status.length; i++) {
      if (id === i) {
        this.ShowUpdate[i] = !this.ShowUpdate[i];
        this.updateuserorder = Object.assign({}, order);
      } else {
        this.ShowUpdate[i] = false;
      }
    }
  }
  ChangeInsert() {
    this.showInsert = !this.showInsert;
    this.showportfolio = false;
    this.showhistory = false;
    this.showsummary = false;
    // this.ShowUpdate = false;
    this.showorders = false;
  }
  // InitializeUserOrder() {
  //  // this.userorder = {
  //   //  PriceType: 0 /*Market -  Limited*/,
  //   //  TimeTerm: 0 /*2- Good Till Day -4 Good Till week -5 Good Till month*/,
  //     BimsUserID: 0,
  //   //  ReutersCode: "",
  //     // Side: 0 /*(2)Buy -(3) Sell -(4) Sell Same Day -(5) T+1*/,
  //   //  Price: 0,
  //  //   Quantity: 0,
  //     Username: "",
  //     CurrencyCode: "EGP",
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
  // //  };
  // }
  showTimeTerm(Term: TimeTerm): string {
    return TimeTerm[Term];
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
}