import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { StockService } from "./../../app/stock.service";
import {
  asksbidsRefresh,
  relnewsRefresh,
  tradesRefresh
} from "./../../app/refreshconfig";
import { AskBidService } from "./../../app/asksbids.service";
import { CompanyService } from "./../../app/company.service";
import { GetService } from "./../../app/else.service";
import { SerResponse } from "./../../app/response.interface";
import { Detailsresponse } from "./../../app/details.interface";
import { Newsresponse } from "./../../app/newsresponse.interface";
import { Newsdetailsresponse } from "./../../app/newsdetailsresponse.interface";
import { BehaviorSubject } from "rxjs";
import { TabsPage } from "../tabs/tabs";
import { HomePage } from "./../WatchList/WatchList";
import { MarketPage } from "./../market/market";
import { ToastController } from "ionic-angular";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
import { NewsdetailsComponent } from "./../newsdetails/newsdetails.component";
@Component({
  // moduleId: module.id,
  selector: "companydetails",
  templateUrl: "companydetails.component.html",
  styles: [`.col{
    background: gray;
    border: think solid black;
    }`]
})
export class CompanydetailsComponent implements OnInit, OnChanges {
  // private _items = new BehaviorSubject<String[]>([]);

  @Input() id: string;
  rootid: number;
  @Input() hidewatchlast: boolean;
  // stockchosen;
  @Output() send: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendhide: EventEmitter<boolean> = new EventEmitter<boolean>();
  // stockchosen:boolean=false;
  showasksbids: boolean = false;
  shownews = false;
  //lastFveDays: boolean = true;
  isFired = false;
  detailsresponse: Detailsresponse;
  showtrades: boolean = false;
  showrelatednews: boolean = false;
  showdetails: boolean = false;
  Asks: SerResponse;
  Bids: SerResponse;
  Stocksimple: SerResponse;
  Trades: Detailsresponse;
  relNews: Newsresponse;
  reuter;
  TradesArray: string[][] = new Array();
  LastTradID : number=0;
  ChartParts : string = "IntraDay"
  isIntraDays : boolean = true;
  asksbidsinitialized = false;
  tradesinitialized = false;
  newsinitialized = false;
  QueteParts: string = "News";
  constructor(
    private StockService: StockService,
    private CompanyService: CompanyService,
    private AskBidService: AskBidService,
    private GetService: GetService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.reuter = navParams.get("reuter");
    this.rootid = navParams.get("rootid");
    this.LastTradID =0;
    this.QueteParts = "News";

    // this.stockchosen = navParams.get("stockchosen");
  }
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.

    if (changes["reuter"] && changes["reuter"].currentValue) {
      this.StockService.getstockdetails(this.reuter, true).subscribe(
        data => {
          this.detailsresponse = data;
        },
        Error => {
          if (!this.isFired) {
            this.ErrorToast();
            this.isFired = true;
          }
        }
      );
      let reuterarr: string[] = new Array();
      reuterarr.push(this.reuter);
      this.StockService.getstock(reuterarr, true).subscribe(
        data => {
          this.Stocksimple = data;
        },
        Error => {
          if (!this.isFired) {
            this.ErrorToast();
            this.isFired = true;
          }
        }
      );
    } else {
    }
  }
  ionViewDidEnter() {
    this.setnews();

    this.shownews = true;
    this.QueteParts = "News";
  }
  ionViewWillLeave() {
    this.showasksbids = false;
    this.shownews = false;
    this.showtrades = false;
  }
  setasksbids() {
    this.AskBidService.getasks(this.reuter).subscribe(
      data => {
        this.Asks = data;
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.AskBidService.getbids(this.reuter).subscribe(
      data => {
        this.Bids = data;
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.showasksbids = true;
    this.showtrades = false;
    this.shownews = false;
    this.refreshAsksBids();
  }
  refreshAsksBids() {
    this.AskBidService.getasks(this.reuter).subscribe(
      data => {
        this.Asks = data;
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.AskBidService.getbids(this.reuter).subscribe(
      data => {
        this.Bids = data;
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    if (this.showasksbids) {
      setTimeout(() => {
        this.refreshAsksBids();
      }, asksbidsRefresh);
    }
  }
  settrades() {
    this.GetService.getquotetrades(this.reuter, this.LastTradID).subscribe(
      data => {
        if(data && data.result && data.result.length>0)
        {
          this.LastTradID =Number(data.result[0][0]);          
        }
        if(!this.Trades)
        {
          this.Trades= {status:"", result:[]}
        }
        var TempTrades: string[]=[];
        TempTrades = data.result;
        
        this.Trades.result = TempTrades.concat(this.Trades.result);

        this.showtrades = true;
        
        if (this.showtrades) {
          setTimeout(() => {
            this.settrades();
          }, tradesRefresh);
        }
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.showasksbids = false;
    this.shownews = false;
    //this.refreshAutoTrades();
  }

  

  refreshAutoTrades() {
    this.GetService.getquotetrades(this.reuter, this.LastTradID).subscribe(
      data => {
        this.Trades = data;
        for (let i = 0; i < this.Trades.result.length; i++) {
          this.TradesArray[i] = new Array();
        }
        for (let i = 0; i < this.Trades.result.length; i++) {
          this.TradesArray[i] = this.Trades.result[i].split(",");

          this.TradesArray[i][
            this.TradesArray[i].length - 1
          ] = this.TradesArray[i][this.TradesArray[i].length - 1].substring(
            0,
            this.TradesArray[i][this.TradesArray[i].length - 1].length - 1
          );
        }
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    if (this.showtrades) {
      setTimeout(() => {
        this.refreshAutoTrades();
      }, tradesRefresh);
    }
  }
  refreshTrades() {
    this.GetService.getquotetrades(this.reuter, 0).subscribe(
      data => {
        this.Trades = data;
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.showtrades = true;
    // this.stockchosen = false;
    // this.send.emit(this.stockchosen);
    this.refreshedToast("Trades");
  }

  refreshAsks() {
    this.AskBidService.getasks(this.reuter).subscribe(
      data => {
        this.Asks = data;
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.AskBidService.getbids(this.reuter).subscribe(
      data => {
        this.Bids = data;
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.showasksbids = true;
    // this.stockchosen = false;
    // this.send.emit(this.stockchosen);
    this.refreshedToast("Asks and Bids");
  }

  showNews() {
    this.showrelatednews = true;
    this.showdetails = false;
  }

  refreshNews() {
    this.CompanyService.getnewsrelated(this.reuter,window["isArabic"]).subscribe(
      data => {
        this.relNews = data;
        this.refreshedToast("News");
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
  }

  setnews() {
    this.CompanyService.getnewsrelated(this.reuter,window["isArabic"]).subscribe(
      data => {
        this.relNews = data;
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.shownews = true;
    this.showasksbids = false;
    this.showtrades = false;
    this.refreshAutoNews();
  }
  refreshAutoNews() {
    this.CompanyService.getnewsrelated(this.reuter,window["isArabic"]).subscribe(
      data => {
        this.relNews = data;
        // this.refreshedToast("News");
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    if (this.shownews) {
      setTimeout(() => {
        this.refreshAutoNews();
      }, relnewsRefresh);
    }
  }
  getdetails(id) {
    this.showrelatednews = false;
    this.id = id;
    this.goToNewsDeatils();
    this.showdetails = !this.showdetails;
  }

  goback() {
    if (this.rootid === 1) {
      this.navCtrl.setRoot(MarketPage);
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }

  refreshedToast(refreshType: string) {
    let toast = this.toastCtrl.create({
      message: refreshType + " refreshed successfully",
      duration: 2000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
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
  showIntraDays() {
    this.ChartParts = "IntraDay";
    this.isIntraDays = true;
    //this.lastFveDays = !this.lastFveDays;
  }
  showHistoricalDays() {
    this.ChartParts = "Historical";
    this.isIntraDays = false;
    //this.lastFveDays = !this.lastFveDays;
  }
  goToNewsDeatils() {
    this.navCtrl.push(NewsdetailsComponent, {
      id: this.id
    });
  }
}
