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
import { language } from "./../settings/settings";
import { CompanydetailsComponent} from '../companydetails/companydetails.component';
@Component({
  selector: "page-home",
  templateUrl: "WatchList.html"
})
export class HomePage implements OnInit {
  List: SerResponse;
  displayList: string[] = new Array();
  displayListDummy: string[] = new Array();
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

  // are chosen alias

  map: { [reuter: string]: Boolean } = {};

  News: Newsresponse;
  relNews: Newsresponse;
  Newsbody: Newsdetailsresponse;
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
        // are chosen alias
        this.map[this.List.result[i][0]] = false; // OK

        this.displayList.push(this.List.result[i][0]);
        this.displayListDummy.push(this.List.result[i][0]);
      }
      this.editpressed = false;
      this.hidewatchlast = false;
      this.showCompanyDetails = false;

      this.storage.keys().then(keys => {
        if (keys) {
          keys.forEach(key => {
            if (key === "watchList") {
              this.storage.get("watchList").then(val => {
                this.StockService.getstock(val, true).subscribe(data => {
                  this.StockDetails = data;
                  this.dispnames = val;
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
              this.dispnames = [this.List.result[0][0], this.List.result[1][0]];
              this.StockService
                .getstock(this.dispnames, true)
                .subscribe(data => {
                  this.StockDetails = data;
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
        } else {
          this.dispnames = [this.List.result[0][0], this.List.result[1][0]];
          this.StockService.getstock(this.dispnames, true).subscribe(data => {
            this.StockDetails = data;
            this.dispnames = [this.List.result[0][0], this.List.result[1][0]];
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

  changepressed() {
    this.editpressed = true;
    this.hidewatchlast = this.editpressed || this.stockchosen;
  }

  setstockchosen(reuter: string) {
    this.stockchosen = true;
    this.hidewatchlast = this.editpressed || this.stockchosen;
    this.reuter = reuter;
    this.showCompanyDetails = true;
    this.goToCompanyDeatils();
  }

  getstockchosen(stockchosen) {
    this.stockchosen = stockchosen;
    console.log(this.stockchosen);
  }

  gethidewatch(stockchosen) {
    this.hidewatchlast = stockchosen;
  }

  falsepressed() {
    this.dispnames = [];
    for (let i = 0; i < this.List.result.length; i++) {
      if (this.map[this.List.result[i][0]] === true) {
        this.dispnames.push(this.List.result[i][0]);
      }
    }

    console.log("before saving more data");
    this.storage.set("watchList", this.dispnames);
    console.log(this.dispnames);
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

  //used for searching
  getItems(ev: any) {
    // console.log(this.map);
    this.displayListDummy = this.displayList;
    if (this.displayListDummy) {
      console.log(this.displayListDummy);
    }
    if (this.displayListDummy) {
      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != "") {
        this.displayListDummy = this.displayListDummy.filter(item => {
          return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
      }
    }
  }

  goToCompanyDeatils(){
    this.navCtrl.push(CompanydetailsComponent,{reuter: this.reuter, rootid: this.rootid, stockchosen: this.stockchosen})
  }
}
