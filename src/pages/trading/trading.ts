import { Component, OnInit } from "@angular/core";
import { portfolioRefresh, ordersRefresh } from "./../../app/refreshconfig";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TradeService } from "./../../app/trade.service";
import { portfolioresponse } from "./../../app/portfolio.interface";
import { AlertController } from "ionic-angular";
import { LoginComponent } from "./../login/login.component";
// import { isArabic } from "./../../app/app.module";
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
import { OrderhistoryPage } from "./../orderhistory/orderhistory";
import {
  ValidationResponse,
  CancelResponse,
  OrderOperationResult,
  Place,
  PlaceOrderStatus,
  PlaceResponse,
  CancelOrderStatus
} from "./../../app/Validate.interface";
import { Detailsresponse } from "./../../app/details.interface";
import { ToastController } from "ionic-angular";
import { token } from "./../../app/token.interface";
import { LoginService } from "./../../app/login.service";
import { Storage } from "@ionic/storage";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
/**
 * Generated class for the TradingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-trading",
  templateUrl: "trading.html",
  styles: [
    `.segment-md .segment-button.activated, .segment-md .segment-button.segment-activated {
    background-color: lightblue;
    border-color: #488aff;
    border-style: solid;
    border-width: 1px;
    background-color: #e0e0e0;
}
.text-input-md {
    border: 1px solid darkgrey;
}`
  ]
  //segment-button segment-activated
})
export class TradingPage implements OnInit {
  //token: token;
  private _token: token;
  get token(): token {
    var t: token = null;
    try {
      t = <token>window["token"];
    } catch (e) {
      alert(e);
    }
    return t;
  }

  userorderhistoryresponse: userorderhistoryresponse;
  userorderresponse: userorderresponse;
  portfolioresponse: portfolioresponse;
  Detailsresponse: Detailsresponse;
  showportfolio: boolean = false;
  showsummary = false;
  showorders = false;
  pincode: number = 0;
  showhistory = false;
  AllUpdatesNotShown = true;
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
    public alertCtrl: AlertController,
    private ToastController: ToastController
  ) {
    this.showAlert();
  }
  ngOnInit() {
    console.log(this.token);
  }

  gotoLogin() {
    // check when he comes bach if he did login
    //this.checkLogin();
    if (this.token == null) {
      this.navCtrl.push(LoginComponent);
    } else {
      if (this.token.Status === "Unauthorized") {
        this.navCtrl.push(LoginComponent);
      }
    }
  }
  goToorderHistory(orderid) {
    this.navCtrl.push(OrderhistoryPage, {
      token: this.token,
      orderid: orderid
    });
  }
  showAlert() {
    this.loggedIn = false;
    if (this.token == null) {
      setTimeout(() => {
        this.showAlert();
      }, portfolioRefresh);
    } else if (this.token.Status === "Unauthorized") {
      setTimeout(() => {
        this.showAlert();
      }, ordersRefresh);
    } else this.loggedIn = true;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TradingPage");
  }
  ionViewDidEnter() {
    this.showAlert();
  }
  ionViewWillLeave() {
    this.showhistory = false;
    this.showInsert = false;
    this.showorders = false;
    this.showportfolio = false;
    for (let i = 0; i < this.ShowUpdate.length; i++) {
      this.ShowUpdate[i] = false;
    }
  }
  getportfolio() {
    /* bn Rashed*/
    //this.checkLogin();
    this.TradeService
      .GetPortfolio(this.token, window["isArabic"])
      .subscribe(data => {
        this.portfolioresponse = data;
        if (this.portfolioresponse.Status == "UnauthorizedOrOverrideToken") {
          window["token"] = null;
          this.ErrorToast("you are not logged in");
          this.gotoLogin();
        }
        console.log(this.portfolioresponse);
      }, Error => this.ErrorToast("Error")!);
    this.showportfolio = !this.showportfolio;
    this.showorders = false;
    this.showhistory = false;
    this.showInsert = false;
    this.refreshPortfolio();

    // this.ShowUpdate = false;
  }

  refreshPortfolio() {
    this.TradeService.GetPortfolio(this.token, window["isArabic"]).subscribe(
      data => {
        this.portfolioresponse = data;
        if (this.portfolioresponse.Status == "UnauthorizedOrOverrideToken") {
          window["token"] = null;
          this.ErrorToast("you are not logged in");
          this.gotoLogin();
        }
        console.log(this.portfolioresponse);
      },
      Error => alert("error")
    );
    if (this.showportfolio) {
      setTimeout(() => {
        this.refreshPortfolio();
      }, portfolioRefresh);
      console.log("refresh port");
    }
  }

  getportfoliosummary() {
    this.TradeService.GetPortfolioSummary(this.token).subscribe(
      data => {
        this.Detailsresponse = data;
        if (this.Detailsresponse.status == "UnauthorizedOrOverrideToken") {
          window["token"] = null;
          this.gotoLogin();
        }
        console.log(this.Detailsresponse);
      },
      Error => this.ErrorToast("Error!")
    );
    this.showsummary = !this.showsummary;
  }
  getorders() {
    this.TradeService.getorders(this.token, window["isArabic"], 2).subscribe(
      data => {
        this.userorderresponse = data;
        console.log(this.userorderresponse);
        if (this.userorderresponse.Status == "UnauthorizedOrOverrideToken") {
          window["token"] = null;
          this.gotoLogin();
        } else {
          for (let i = 0; i < this.userorderresponse.Status.length; i++) {
            this.ShowUpdate[i] = false;
            if (this.ShowUpdate[i] === true) {
              this.AllUpdatesNotShown = false;
            }
          }
        }
      },
      Error => this.ErrorToast("Error!")
    );
    this.showorders = !this.showorders;
    this.showportfolio = false;
    this.showhistory = false;
    this.showInsert = false;
    // this.ShowUpdate = false;
    this.refreshOrders();
  }

  refreshOrders() {
    this.TradeService
      .getorders(this.token, window["isArabic"], 2)
      .subscribe(data => {
        this.userorderresponse = data;
        console.log(this.userorderresponse);
        if (this.userorderresponse.Status == "UnauthorizedOrOverrideToken") {
          window["token"] = null;
          this.gotoLogin();
        } else {
          // for (let i = 0; i < this.userorderresponse.Status.length; i++) {
          //   this.ShowUpdate[i] = false;
          // }
        }
      }, Error => this.ErrorToast);
    if (this.showorders && this.AllUpdatesNotShown) {
      setTimeout(() => {
        this.refreshOrders();
      }, ordersRefresh);
      console.log("refreshorders");
    }
  }

  getorderhistory(orderid) {
    this.goToorderHistory(orderid);
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
      .ValidateOrder(window["isArabic"], false, this.userorder, this.token)
      .subscribe(
        data => {
          this.ValidationResponse = data;
          console.log(this.ValidationResponse);
          if (this.ValidationResponse.Status === "OK") {
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
          } else {
            alert("please insert all fields with Valid Values");
          }
        },
        Error => this.ErrorToast("Error!")
      );

    //  console.log(this.pincode);
  }

  placeOrder() {
    this.pincode = Number(prompt("please enter the pin code"));
    this.TradeService
      .PlaceOrder(
        window["isArabic"],
        false,
        this.userorder,
        this.token,
        this.pincode
      )
      .subscribe(
        data => {
          this.Createresponse = data;
          console.log(this.Createresponse);
          console.log(this.Createresponse);
          alert(this.Createresponse.result.OutMessages);
        },
        Error => this.ErrorToast("Error!")
      );
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
      .ValidateOrder(window["isArabic"], true, this.updateuserorder, this.token)
      .subscribe(
        data => {
          this.ValidationResponse = data;
          console.log(this.ValidationResponse);
          if (this.ValidationResponse.Status === "OK") {
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
                  window["isArabic"],
                  true,
                  this.updateuserorder,
                  this.token,
                  this.pincode
                )
                .subscribe(
                  data => {
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
                  },
                  Error => this.ErrorToast("Error!")
                );
            } else {
              alert(this.ValidationResponse.result.Message);
            }
          } else {
            alert("Please Fill all Fields with valid values");
          }
        },
        Error => this.ErrorToast("Error!")
      );
  }
  CancelOrder(orderid: number) {
    this.pincode = Number(prompt("please enter your pin code"));
    this.TradeService
      .CancelOrder(orderid, window["isArabic"], this.pincode, this.token)
      .subscribe(
        data => {
          this.CancelResponse = data;
          console.log(this.CancelResponse);
          alert(this.CancelResponse.result.OutMessages);
        },
        Error => this.ErrorToast("Error")
      );
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
    for (let i = 0; i < this.userorderresponse.result.length; i++) {
      if (id === i) {
        this.ShowUpdate[i] = !this.ShowUpdate[i];
        if (this.ShowUpdate[i] === true) {
          this.AllUpdatesNotShown = false;
        } else {
          this.AllUpdatesNotShown = true;
        }
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
  ErrorToast(message: string) {
    let toast = this.ToastController.create({
      message: message,
      duration: 2000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
