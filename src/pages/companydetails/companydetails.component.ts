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
import { NavController } from "ionic-angular";
import { StockService } from "./../../app/stock.service";
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
import { TranslateService, TranslatePipe } from "ng2-translate";
import { language } from "./../settings/settings";
import { ToastController } from "ionic-angular";

@Component({
  // moduleId: module.id,
  selector: "companydetails",
  templateUrl: "companydetails.component.html"
  // styleUrls: ['companydetails.component.scss']
})
export class CompanydetailsComponent implements OnInit, OnChanges {
  // private _items = new BehaviorSubject<String[]>([]);

  @Input() reuter: string;
  @Input() id: string;
  @Input() rootid: number;
  @Input() hidewatchlast: boolean;
  @Input() stockchosen;
  @Output() send: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendhide: EventEmitter<boolean> = new EventEmitter<boolean>();
  // stockchosen:boolean=false;
  showasksbids: boolean = false;
  detailsresponse: Detailsresponse;
  showtrades: boolean = false;
  showrelatednews: boolean = false;
  showdetails: boolean = false;
  Asks: SerResponse;
  Bids: SerResponse;
  Stocksimple: SerResponse;
  Trades: Detailsresponse;
  relNews: Newsresponse;
  constructor(
    private StockService: StockService,
    private CompanyService: CompanyService,
    private AskBidService: AskBidService,
    private GetService: GetService,
    private navCtrl: NavController,
    private TranslateService: TranslateService,
    private toastCtrl: ToastController
  ) {}
  ngOnInit() {
    // this.navCtrl.push(CompanydetailsComponent);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.reuter);
    this.TranslateService.use(language);
  }
  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.

    if (changes["reuter"] && changes["reuter"].currentValue) {
      this.StockService.getstockdetails(this.reuter, true).subscribe(data => {
        this.detailsresponse = data;
        console.log(this.detailsresponse);
      });
      let reuterarr: string[] = new Array();
      reuterarr.push(this.reuter);
      this.StockService.getstock(reuterarr, true).subscribe(data => {
        this.Stocksimple = data;
        console.log(this.Stocksimple);
      });
    } else {
    }
  }
  setasksbids() {
    if (!this.showasksbids) {
      this.AskBidService.getasks(this.reuter).subscribe(data => {
        this.Asks = data;
        console.log(this.Asks);
      });
      this.AskBidService.getbids(this.reuter).subscribe(data => {
        this.Bids = data;
        console.log(this.Bids);
      });
      this.showasksbids = true;
      this.stockchosen = false;
      this.send.emit(this.stockchosen);
    } else {
      this.showasksbids = false;
      this.stockchosen = true;
      this.send.emit(this.stockchosen);
    }
  }
  settrades() {
    if (!this.showtrades) {
      this.GetService.getquotetrades(this.reuter, 0).subscribe(data => {
        this.Trades = data;
      });
      this.showtrades = true;
      this.stockchosen = false;
      this.send.emit(this.stockchosen);
    } else {
      this.showtrades = false;
      this.stockchosen = true;
      this.send.emit(this.stockchosen);
    }
  }

  refreshTrades() {
    this.GetService.getquotetrades(this.reuter, 0).subscribe(data => {
      this.Trades = data;
    });
    this.showtrades = true;
    this.stockchosen = false;
    this.send.emit(this.stockchosen);
    this.refreshedToast("Trades");
  }

  refreshAsks() {
    this.AskBidService.getasks(this.reuter).subscribe(data => {
      this.Asks = data;
    });
    this.AskBidService.getbids(this.reuter).subscribe(data => {
      this.Bids = data;
    });
    this.showasksbids = true;
    this.stockchosen = false;
    this.send.emit(this.stockchosen);
    this.refreshedToast("Asks and Bids");
  }

  showNews() {
    this.showrelatednews = true;
    this.showdetails = false;
  }

  refreshNews() {
    this.CompanyService.getnewsrelated(this.reuter).subscribe(data => {
      this.relNews = data;
      this.refreshedToast("News");
    });
  }

  setnews() {
    this.CompanyService.getnewsrelated(this.reuter).subscribe(data => {
      this.relNews = data;
    });
    this.showrelatednews = !this.showrelatednews;
  }

  getdetails(id) {
    this.showrelatednews = false;
    this.id = id;
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
      duration: 3000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
