export let language: string = "en";
import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { NavController } from "ionic-angular";
import { StockService } from "./../../app/stock.service";
import { AskBidService } from "./../../app/asksbids.service";
import { CompanyService } from "./../../app/company.service";
import { GetService } from "./../../app/else.service";
import { SerResponse } from "./../../app/response.interface";
import { Detailsresponse } from "./../../app/details.interface";
import { Newsresponse } from "./../../app/newsresponse.interface";
import { Newsdetailsresponse } from "./../../app/newsdetailsresponse.interface";
import { Storage } from "@ionic/storage";
import { TranslateService, TranslatePipe } from "ng2-translate";
@Component({
  selector: "page-home",
  templateUrl: "WatchList.html"
})
export class HomePage implements OnInit {
  List: SerResponse;
  StockDetails: SerResponse;
  reuter: string;
  Asks: SerResponse;
  Bids: SerResponse;
  Trades: Detailsresponse;
  editpressed: boolean = false;
  stockchosen: boolean = false;
  rootid: number = 2;
  showasksbids: boolean = false;
  showtrades: boolean = false;
  showCompanyDetails: boolean;
  hidewatchlast = this.stockchosen || this.editpressed;
  showrelatednews: boolean = false;
  arechosen: boolean[] = new Array();
  News: Newsresponse;
  relNews: Newsresponse;
  Newsbody: Newsdetailsresponse;
  displayed: string[][] = new Array();
  dispnames: string[] = new Array();
  language = "en";
  constructor(
    public navCtrl: NavController,
    private StockService: StockService,
    private CompanyService: CompanyService,
    private AskBidService: AskBidService,
    private GetService: GetService,
    private storage: Storage,
    private TranslateService: TranslateService
  ) {}

  ngOnInit() {
    this.TranslateService.use(language);
    this.StockService.getnames(true).subscribe(data => {
      this.List = data;
      for (let i = 0; i < this.List.result.length; i++) {
        this.arechosen[i] = false;
      }

      console.log(this.List.result[0]);
      this.editpressed = false;
      this.hidewatchlast = false;
      this.showCompanyDetails = false;

      console.log("before retriveing storage");
      this.storage.keys().then(keys => {
        if (keys.length) {
          this.storage.get("watchList").then(val => {
            console.log("Got the storag data");
            this.StockService.getstock(val, true).subscribe(data => {
              this.StockDetails = data;
              this.dispnames = val;
              this.displayed = val;
              console.log(this.StockDetails.result);
              for (let i = 0; i < this.StockDetails.result.length; i++) {
                this.StockDetails.result[i].push(this.dispnames[i]);
              }
              console.log(this.StockDetails);
            });
            this.editpressed = false;
            this.hidewatchlast = this.editpressed || this.stockchosen;
          });
        } else {
          console.log("in else");
          console.log(this.List.result[0]);
          this.StockService.getstock(this.List[0], true).subscribe(data => {
            this.StockDetails = data;
            this.dispnames = this.List[0];
            this.displayed = this.List[0];
            console.log(this.StockDetails.result);
            for (let i = 0; i < this.StockDetails.result.length; i++) {
              this.StockDetails.result[i].push(this.dispnames[i]);
            }
            console.log(this.StockDetails);
          });
          this.editpressed = false;
          this.hidewatchlast = this.editpressed || this.stockchosen;
        }
      });
    });
  }
  toarab() {
    this.language = "ar";
    language = this.language;
    this.TranslateService.use(this.language);
  }
  toen() {
    this.language = "en";
    language = this.language;
    this.TranslateService.use(this.language);
  }
  changepressed() {
    this.editpressed = true;
    this.hidewatchlast = this.editpressed || this.stockchosen;
  }

  setstockchosen(reuter: string) {
    this.stockchosen = true;
    this.hidewatchlast = this.editpressed || this.stockchosen;
    this.reuter = reuter;
    this.showCompanyDetails = true;
  }

  getstockchosen(stockchosen) {
    this.stockchosen = stockchosen;
    console.log(this.stockchosen);
  }

  gethidewatch(stockchosen) {
    this.hidewatchlast = stockchosen;
  }

  falsepressed() {
    this.displayed = [];
    this.dispnames = [];
    for (let i = 0; i < this.List.result.length; i++) {
      if (this.arechosen[i] === true) {
        this.displayed.push(this.List.result[i]);
        this.dispnames.push(this.List.result[i][0]);
      }
    }

    console.log("before saving more data");
    this.storage.set("watchList", this.dispnames);
    console.log(this.dispnames);
    console.log(this.arechosen);
    this.StockService.getstock(this.dispnames, true).subscribe(data => {
      this.StockDetails = data;
      for (let i = 0; i < this.StockDetails.result.length; i++) {
        this.StockDetails.result[i].push(this.dispnames[i]);
      }
      console.log(this.StockDetails);
    });
    this.editpressed = false;
    this.hidewatchlast = this.editpressed || this.stockchosen;
  }

  removeFromWatchlist(index: number) {
    // Update saved watchlist
    this.dispnames.splice(index, 1);
    this.storage.set("watchList", this.dispnames);

    // TODO: Add test here
    this.storage.get("watchList").then(val => {
      console.log(val);
    });
    // Update viewed watchlist
    this.StockDetails.result.splice(index, 1);
    console.log(this.StockDetails.result);

    // TODO: mark in the adding list
  }

  // We should remove the already added elements from the add to list
  addToWatchlist() {
    this.editpressed = true;
    this.hidewatchlast = this.editpressed || this.stockchosen;
  }
}
