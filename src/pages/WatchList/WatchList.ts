export let language: string = "en";
export let isArabic: boolean = false;
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  HostListener
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
import { Storage } from "@ionic/storage";
import { TranslateService, TranslatePipe } from "ng2-translate";
// import { language } from "./../settings/settings";
// import { isArabic } from "./../settings/settings";
import { CompanydetailsComponent } from "../companydetails/companydetails.component";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
@Component({
  selector: "page-home",
  templateUrl: "WatchList.html"
})
export class HomePage implements OnInit {
  isSmall: boolean = false;
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
  initialized: boolean = true;
  initializedref: boolean = false;
  dorefresh = false;
  isArabic : boolean = false;
  // are chosen alias

  map: { [reuter: string]: Boolean } = {};

  News: Newsresponse;
  relNews: Newsresponse;
  Newsbody: Newsdetailsresponse;
  dispnames: string[] = new Array();
  // language = language;
  constructor(
    public navCtrl: NavController,
    private StockService: StockService,
    private CompanyService: CompanyService,
    private AskBidService: AskBidService,
    private GetService: GetService,
    private storage: Storage,
    private TranslateService: TranslateService
  ) {}
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    console.log("Width: " + event.target.innerWidth);
    this.isSmall = event.target.innerWidth < 414 ? true : false;
  }
  ngOnInit() {
    // this.TranslateService.use(language);
    // this.storage.keys().then (
    //   keys=>{
    //     if(keys){

    //     }
    //    window['token'] = data;
    // });
    this.storage.get("language").then(val => {
      if(val){
      window["language"] = val;
      }
      else
      {
        window["language"] = "en";
        this.storage.set("language","en");
        this.storage.set("isArabic", false);
      }
      console.log(val);
    });
    this.storage.get("isArabic").then(val => {
      window["isArabic"] = val;
      this.isArabic = window["isArabic"];
      console.log(val);
    });
    this.storage.get("token").then(val => {
      window["token"] = val;
      console.log(val);
    });

    console.log(window["token"]);
    console.log(this.storage.get("token"));
    this.StockService.getnames(this.isArabic).subscribe(
      data => {
        this.List = data;
        console.log(this.List);
        for (let i = 0; i < this.List.result.length; i++) {
          // are chosen alias
          this.map[this.List.result[i][0]] = false; // OK

          this.displayList.push(this.List.result[i][0]);
          this.displayListDummy.push(this.List.result[i][0]);
        }
        // console.log(this.displayList);
        this.editpressed = false;
        // this.hidewatchlast = false;
        // this.showCompanyDetails = false;
        console.log(this.dispnames);
        this.storage.keys().then(keys => {
          if (keys) {
            keys.forEach(key => {
              if (key === "watchList") {
                this.storage.get("watchList").then(val => {
                  this.StockService.getstock(val, this.isArabic).subscribe(
                    data => {
                      this.StockDetails = data;
                      this.dispnames = val;

                      for (let i = 0; i < data.result.length; i++) {
                        this.StockDetails.result[i].push(this.dispnames[i]);
                        for (let j = 0; j < this.List.result.length; j++) {
                          if (this.List.result[j][0] === this.dispnames[i]) {
                            this.StockDetails.result[i].push(
                              this.List.result[j][1]
                            );
                          }
                        }
                      }
                    },
                    Error =>
                      alert(
                        "Error! Please Check your Connectivity and restart the application"
                      )
                  );
                  this.editpressed = false;
                  //   this.hidewatchlast = this.editpressed || this.stockchosen;
                });
              }
            });
          } else {
            console.log(this.dispnames)
            this.dispnames = [this.List.result[0][0], this.List.result[1][0]];
            this.StockService.getstock(this.dispnames, this.isArabic).subscribe(
              data => {
                this.StockDetails = data;
                this.dispnames = [
                  this.List.result[0][0],
                  this.List.result[1][0]
                ];
                console.log(this.StockDetails.result);
                for (let i = 0; i < this.StockDetails.result.length; i++) {
                  this.StockDetails.result[i].push(this.dispnames[i]);
                }
                console.log(this.StockDetails);
              }
              // ,
              // Error =>
              //   alert(
              //     "Error! Please Check your Connectivity and restart the application"
              //   )
            );
            console.log(this.dispnames);
            this.editpressed = false;
          }
        });
      }
      // ,
      // Error =>
      //   alert(
      //     "Error! Please Check your Connectivity and restart the application"
      //   )
    );
    this.initializedref = true;
  }
  ionViewDidEnter() {
    this.dorefresh = true;
    this.refresh();
    // console.log(LanguagePipe);
  }
  ionViewWillLeave() {
    this.dorefresh = false;
  }
  refresh() {
    //  setTimeout(() => {
    //     }, 1000);

    this.StockService.getstock(this.dispnames, this.isArabic).subscribe(
      data => {
        this.StockDetails = data;
        for (let i = 0; i < this.StockDetails.result.length; i++) {
          this.StockDetails.result[i].push(this.dispnames[i]);
          for (let j = 0; j < this.List.result.length; j++) {
            if (this.List.result[j][0] === this.dispnames[i]) {
              this.StockDetails.result[i].push(this.List.result[j][1]);
            }
          }
        }
        this.StockService.getnames(this.isArabic).subscribe(
          data => {
            this.List = data;
          }
          // ,
          // Error =>
          //   alert(
          //     "Error! Please Check your Connectivity and restart the application"
          //   )
        );
        // console.log(this.News);
      },
      Error =>
        alert(
          "Error! Please Check your Connectivity and restart the application"
        )
    );
    this.isArabic = window["isArabic"];

    // this.language = language;
    if (this.dorefresh) {
      setTimeout(() => {
        this.refresh();
      }, 1000);
      console.log("refresh");
    }
  }
  searchList(reuter: string) {
    for (let i = 0; i < this.List.result.length; i++) {
      if (this.List.result[i][0] === reuter) {
        return this.List.result[i][1];
      }
    }
  }
  changepressed() {
    this.editpressed = true;
  }

  setstockchosen(reuter: string) {
    this.stockchosen = true;
    this.reuter = reuter;
    this.goToCompanyDeatils();
  }

  falsepressed() {
    // if (this.List.result.length > 0) {
    //   this.dispnames = [];
    // }

    for (let i = 0; i < this.List.result.length; i++) {
      console.log(this.map[this.displayListDummy[i]]);

      if (this.map[this.displayListDummy[i]] === true) {
        console.log(this.map[this.displayListDummy[i]]);
        this.dispnames.push(this.displayListDummy[i]);
        this.displayListDummy[i] = this.displayListDummy[
          this.displayListDummy.length - 1
        ];
        this.displayListDummy.pop();
        console.log(this.displayListDummy);

        console.log("saved");
      }
    }
    this.displayList = this.displayListDummy;
    console.log("before saving more data");
    this.storage.set("watchList", this.dispnames);
    console.log(this.dispnames);
    this.StockService.getstock(this.dispnames, this.isArabic).subscribe(
      data => {
        this.StockDetails = data;
        for (let i = 0; i < this.StockDetails.result.length; i++) {
          this.StockDetails.result[i].push(this.dispnames[i]);
        }
        console.log(this.StockDetails);
      },
      Error =>
        alert(
          "Error! Please Check your Connectivity and restart the application"
        )
    );
    this.editpressed = false;
  }

  removeFromWatchlist(index: number) {
    // Update saved watchlist
    if (this.initialized === false) {
      this.displayListDummy.push(this.dispnames[index]);
    }
    this.displayListDummy.sort();
    this.map[this.dispnames[index]] = false;
    this.displayList = this.displayListDummy;
    console.log("removed");
    console.log(this.map[this.dispnames[index]]);
    console.log(this.dispnames[index]);
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
    if (this.initialized === true) {
      console.log(this.displayListDummy.length);
      console.log("initialized");
      for (let k = 0; k < this.dispnames.length; k++) {
        for (let i = 0; i < this.List.result.length; i++) {
          if (this.dispnames[k] === this.displayListDummy[i]) {
            this.map[this.displayListDummy[i]] = true;
            console.log(this.List.result[i][0]);
            console.log(this.displayListDummy[i]);
            console.log(this.dispnames[k]);
            this.displayListDummy[i] = this.displayListDummy[
              this.displayListDummy.length - 1
            ];
            this.displayListDummy.pop();
            console.log(this.displayListDummy);
            break;
          }
        }
      }
      this.initialized = false;
    }
    // this.hidewatchlast = this.editpressed || this.stockchosen;
    // for (let i = 0; i < this.displayListDummy.length; i++) {
    //   this.map[this.displayListDummy[i]] = false;
    // }

    this.displayListDummy.sort();
    this.displayList = this.displayListDummy;
  }

  //used for searching
  getItems(ev: any) {
    // console.log(this.map);
    this.displayList = this.displayListDummy;
    if (this.displayList) {
      console.log(this.displayListDummy);
    }
    if (this.displayList) {
      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != "") {
        this.displayList = this.displayList.filter(item => {
          return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
      }
    }
  }

  goToCompanyDeatils() {
    this.navCtrl.push(CompanydetailsComponent, {
      reuter: this.reuter,
      rootid: this.rootid,
      stockchosen: this.stockchosen
    });
  }
}
