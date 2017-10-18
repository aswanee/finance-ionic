import { Component, OnInit } from "@angular/core";
import { portfolioRefresh, ordersRefresh } from "./../../app/refreshconfig";
import { IonicPage, NavController, NavParams ,ModalController} from "ionic-angular";
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
import { CompanydetailsComponent } from "../companydetails/companydetails.component";
import {AutocompletePage} from '../autocomplete/autocomplete'
import { StockService } from "./../../app/stock.service";
import { Equals } from "../../Lib/Compare";

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
  //userorderresponse: userorderresponse;
  UserOpenOrderResponse: userorderresponse;
  UserNotOpenOrderResponse: userorderresponse;
  portfolioresponse: portfolioresponse;
  Detailsresponse: any;
  showportfolio: boolean = false;
  showsummary = false;
  showorders = false;
  pincode: number = 0;
  showhistory = false;
  //AllowRefreshOrders = true;
  userorder: userorder = {
    PriceType: PriceType.Market /*Market -  Limited*/,
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
  SelectedSegment: string = "Portfolio";
  isArabic:boolean=true;
  OrderSearchItem:string[]=["","","","","",""];
  DirClass:string = "";
  OrdresData: Array<{id: string ,title: string, details: any, icon: string, showDetails: boolean}> = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private LoginService: LoginService,
    private TradeService: TradeService,
    private storage: Storage,
    public alertCtrl: AlertController,
    private ToastController: ToastController,
    private modalCtrl: ModalController,
    private StockService: StockService,
  ) {
    this.SelectedSegment= "Portfolio";
    this.showAlert();
    this.userorder.ReutersCode= '';

    this.OrdresData.push({
      id:"open",
      title: 'Open Orders ',
      details: this.UserOpenOrderResponse,
      icon: 'ios-remove-circle-outline',
      showDetails: true
    });
    this.OrdresData.push({
      id:"notopen",
      title: 'Not Open Orders ',
      details: this.UserNotOpenOrderResponse,
      icon: 'ios-add-circle-outline',
      showDetails: false
    });
  }
  ngOnInit() {
    console.log(this.token);
  }

  gotoLogin() {
    // check when he comes bach if he did login
    //this.checkLogin();
    this.isArabic = window["isArabic"];
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
    this.showhistory = false;
    this.showInsert = false;
    this.showorders = false;
    this.showportfolio = false;

    if(this.SelectedSegment== "Orders" ) {
      this.showorders = true;
      this.getorders();
    }
    else if(this.SelectedSegment== "Insert" ) {
      this.showInsert = true;
      this.ChangeInsert();
    }
    else
    {
      this.SelectedSegment= "Portfolio";
      this.getportfolio();
      this.getportfoliosummary();
      this.showportfolio = true;
    }              
            


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
    this.isArabic = window["isArabic"];
    
    this.TradeService
      .GetPortfolio(this.token, window["isArabic"])
      .subscribe(data => {
        this.portfolioresponse = data;
        if (this.portfolioresponse.Status == "UnauthorizedOrOverrideToken") {
          window["token"] = null;
          this.ErrorToast("you are not logged in");
          this.gotoLogin();
        }
      }, Error => this.ErrorToast("Error")!);
    this.showportfolio = !this.showportfolio;
    this.showorders = false;
    this.showhistory = false;
    this.showInsert = false;
    this.refreshPortfolio();

    // this.ShowUpdate = false;
  }

  refreshPortfolio() {
    this.isArabic = window["isArabic"];
    
    this.TradeService.GetPortfolio(this.token, window["isArabic"]).subscribe(
      data => {
        this.portfolioresponse = data;
        if (this.portfolioresponse.Status == "UnauthorizedOrOverrideToken") {
          window["token"] = null;
          this.ErrorToast("you are not logged in");
          this.gotoLogin();
        }
      },
      Error => alert("error")
    );
    this.getportfoliosummary();
    if (this.showportfolio) {
      setTimeout(() => {
        this.refreshPortfolio();
      }, portfolioRefresh);
    }
  }

  getportfoliosummary() { 
    this.TradeService.GetPortfolioSummary(this.token).subscribe(
      data => {
        //console.log(data);
        if(data.result && data.result.length>0)
        {
          this.Detailsresponse = data.result[0];
        }
        if (data.status == "UnauthorizedOrOverrideToken") {
          window["token"] = null;
          this.gotoLogin();
        }
      },
      Error => this.ErrorToast("Error!")
    );
    this.showsummary = !this.showsummary;
  }

  getorders() {
    this.isArabic = window["isArabic"];
    
    this.TradeService.getorders(this.token, window["isArabic"], 1).subscribe(
      data => {
        this.UserOpenOrderResponse = data;
        if (this.UserOpenOrderResponse.Status == "UnauthorizedOrOverrideToken") {
          window["token"] = null;
          this.gotoLogin();
        } else {
          for (let i = 0; i < this.UserOpenOrderResponse.Status.length; i++) {
            this.ShowUpdate[i] = false;
            // if (this.ShowUpdate[i] === true) {
            //   this.All UpdatesNotShown = false;
            // }
          }
        }
      },
      Error => this.ErrorToast("Error!")
    );
    this.TradeService.getorders(this.token, window["isArabic"], 2).subscribe(
      data => {
        this.UserNotOpenOrderResponse = data;
        if (this.UserNotOpenOrderResponse.Status == "UnauthorizedOrOverrideToken") {
          window["token"] = null;
          this.gotoLogin();
        } else {
          for (let i = 0; i < this.UserNotOpenOrderResponse.Status.length; i++) {
            this.ShowUpdate[i] = false;
            // if (this.ShowUpdate[i] === true) {
            //   this.All UpdatesNotShown = false;
            // }
          }
        }
      },
      Error => this.ErrorToast("Error!")
    );

    this.showorders = true;
    this.showportfolio = false;
    this.showhistory = false;
    this.showInsert = false;
    // this.ShowUpdate = false;
    this.refreshOpenOrders();
  }

  refreshOpenOrders() {
    this.isArabic = window["isArabic"];
    
    this.TradeService
      .getorders(this.token, window["isArabic"], 1)
      .subscribe(data => {
        if(this.UserOpenOrderResponse && this.UserOpenOrderResponse.result){
          if(data.result.length != this.UserOpenOrderResponse.result.length)
          {
            this.UserOpenOrderResponse = data;
            console.log("UserOpenOrderResponse === data");
          }
          else
          {
            for(var i=0;i<data.result.length ;i++)
            {
              if(!Equals(data.result[i],this.UserOpenOrderResponse.result[i]))
              {
                console.log("UserOpenOrderResponse === data");
                this.UserOpenOrderResponse.result[i] = data.result[i];
              }
            }
          }
        }
        //this.UserOpenOrderResponse = data;
        if (this.UserOpenOrderResponse.Status == "UnauthorizedOrOverrideToken") {
          window["token"] = null;
          this.gotoLogin();
        }
      }, Error => this.ErrorToast);
    if (this.showorders) {
      setTimeout(() => {
        this.refreshOpenOrders();
      }, ordersRefresh);
    }
  }

  refreshNotOpenOrders() {
    this.isArabic = window["isArabic"];
    this.TradeService
      .getorders(this.token, window["isArabic"], 2)
      .subscribe(data => {
        this.UserNotOpenOrderResponse = data;
        if (this.UserOpenOrderResponse.Status == "UnauthorizedOrOverrideToken") {
          window["token"] = null;
          this.gotoLogin();
        }
      }, Error => this.ErrorToast);
  }

  getorderhistory(orderid) {
    this.goToorderHistory(orderid);
  }

  CreateUpdateOrder() {
    // this.InitializeUserOrder();
    this.isArabic = window["isArabic"];
    
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
    this.TradeService
      .ValidateOrder(window["isArabic"], false, this.userorder, this.token)
      .subscribe(
        data => {
          this.ValidationResponse = data;
          if (this.ValidationResponse.Status === "OK") {
            if (
              this.ValidationResponse.result.Result.toString() ===
              OrderOperationResult[OrderOperationResult.Success]
            ) {
              this.placeOrder();
            } else {
              alert(this.ValidationResponse.result.Message);
            }
          } else {
            alert("please insert all fields with Valid Values");
          }
        },
        Error => this.ErrorToast("Error!")
      );

  }

  placeOrder() {
    this.isArabic = window["isArabic"];
    
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
          alert(this.Createresponse.result.OutMessages);
        },
        Error => this.ErrorToast("Error!")
      );
  }

  UpdateOrder(order: userorder) {
    this.isArabic = window["isArabic"];
    
    this.updateuserorder.Username = this.token.result.UserName;

    if (this.EnablePrice) {
    } else {
      this.updateuserorder.Price = 0;
    }
    this.TradeService
      .ValidateOrder(window["isArabic"], true, this.updateuserorder, this.token)
      .subscribe(
        data => {
          this.ValidationResponse = data;
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
    this.isArabic = window["isArabic"];
    
    this.pincode = Number(prompt("please enter your pin code"));
    this.TradeService
      .CancelOrder(orderid, window["isArabic"], this.pincode, this.token)
      .subscribe(
        data => {
          this.CancelResponse = data;
          alert(this.CancelResponse.result.OutMessages);
        },
        Error => this.ErrorToast("Error")
      );
  }

  ChooseDay() {
    this.userorder.TimeTerm = TimeTerm.Day;
    this.updateuserorder.TimeTerm = TimeTerm.Day;
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
  }

  ChooseBuy() {
    this.userorder.Side = OrderSide.Buy;
    this.updateuserorder.Side = OrderSide.Buy;
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
    var lShowUpdate = true;
    for (let i = 0; i < this.UserOpenOrderResponse.result.length; i++) {
      if (id === i) {
        this.ShowUpdate[i] = true;
        lShowUpdate = false;
        this.updateuserorder = Object.assign({}, order);
        break;
      } 
      else {
        this.ShowUpdate[i] = false;
      }
    }
    this.showorders = lShowUpdate;
  }

  ChangeInsert() {
    this.showInsert = !this.showInsert;
    this.showportfolio = false;
    this.showhistory = false;
    this.showsummary = false;
    // this.ShowUpdate = false;
    this.showorders = false;
    this.ChooseMarket();
  }
  
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

  setstockchosen(item: any){
    this.goToCompanyDeatils(item.ReutersCode,3,true);
  }

  goToCompanyDeatils(ReutersCode:string,rootid:number,stockchosen: boolean) {
    this.navCtrl.push(CompanydetailsComponent, {
      reuter: ReutersCode,
      rootid: rootid,
      stockchosen: stockchosen
    });
  }

  showAddressModal(){
    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.OrderSearchItem = data;
      this.OrderSearchItem.push("");
      this.OrderSearchItem.push("");
      this.OrderSearchItem.push("");
      
      this.userorder.ReutersCode = this.OrderSearchItem[0];
       this.StockService.getstock([this.OrderSearchItem[0]], this.isArabic).subscribe(
        data => {
          var Change :number = eval(data.result[0][1]);
          this.DirClass="";

          if(Change > 0)
          {
            this.DirClass="gainColor";
          }
          if(Change < 0)
          {
            this.DirClass="loosColor";
          }
          this.OrderSearchItem[3] = data.result[0][0];
          this.OrderSearchItem[4] = data.result[0][1];
          this.OrderSearchItem[5] = data.result[0][2];
        },
        Error => {
          // if (!this.isFired) {
          //   this.ErrorToast();
          //   this.isFired = true;
          // }
        }
      );
    });
    modal.present();
  }

  toggleDetails(curElem) {
    this.OrdresData.forEach(element => {
      if(element === curElem)
      {
        if (curElem.showDetails) {
          curElem.showDetails = false;
          curElem.icon = 'ios-add-circle-outline';
        } else {
          curElem.showDetails = true;
          curElem.icon = 'ios-remove-circle-outline';
        }
      }
      else
      {
        element.showDetails = false;
        element.icon = 'ios-add-circle-outline';
      }
    });

  }


}
