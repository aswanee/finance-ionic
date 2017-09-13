// import { language, isArabic } from "./../../app/app.module";
import { Component, OnInit, HostListener } from "@angular/core";
import { MarketResponse } from "./../../app/Marketresponse.interface";
import { MarketService } from "./../../app/market.service";
import { NavController, IonicPage, NavParams } from "ionic-angular";
import { SerResponse } from "./../../app/response.interface";
import { CompanydetailsComponent } from "./../companydetails/companydetails.component";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
import { ToastController } from "ionic-angular";

/**
 * Generated class for the MarketPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  moduleId: "./../../app/app.module.ts",
  selector: "page-market",
  templateUrl: "market.html"
})
export class MarketPage {
  lastFveDays: boolean = false;
  // lstFveDays70: boolean = false;
  // lstFveDays100: boolean = false;

  index: number = 0;
  IndicesTable: MarketResponse;
  show30: boolean = false;
  show70: boolean = false;
  show100: boolean = false;
  PerformersTable: MarketResponse;
  EGX30: SerResponse;
  EGX70: SerResponse;
  showChart: boolean = false;
  stockchosen: boolean = false;
  isSmall: boolean = false;
  anotherbool: boolean = true;
  reuter: string;
  EGX100: SerResponse;
  Indices: SerResponse[] = new Array();
  BP: SerResponse;
  rootid: number = 1;
  BV: SerResponse;
  WP: SerResponse;
  isFired = false;
  dorefresh = true;
  initialized = false;
  constructor(
    public navCtrl: NavController,
    private MarketService: MarketService,
    private ToastController: ToastController
  ) {}
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    console.log("Width: " + event.target.innerWidth);
    this.isSmall = event.target.innerWidth < 414 ? true : false;
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.MarketService.getindicestable().subscribe(
      data => {
        this.IndicesTable = data;
        console.log(this.IndicesTable);
      },
      Error => this.ErrorToast()
    );
    this.MarketService.getperformerstable().subscribe(data => {
      this.PerformersTable = data;
      console.log(this.PerformersTable);
    });
    this.MarketService.getindices("EGX30").subscribe(
      data => {
        this.EGX30 = data;
        console.log(this.EGX30);
        //  this.Indices.push(this.EGX30);
      },
      Error => this.ErrorToast()
    );
    this.MarketService.getindices("EGX70").subscribe(
      data => {
        this.EGX70 = data;
        console.log(this.EGX70);
        //  this.Indices.push(this.EGX70);
      },
      Error => this.ErrorToast()
    );
    this.MarketService.getindices("EGX100").subscribe(
      data => {
        this.EGX100 = data;
        console.log(this.EGX100);
        //   this.Indices.push(this.EGX100);
      },
      Error => this.ErrorToast()
    );
    this.MarketService.getperformers("BP", window["isArabic"]).subscribe(
      data => {
        this.BP = data;
        console.log(this.BP);
      },
      Error => this.ErrorToast()
    );
    this.MarketService.getperformers("BV", window["isArabic"]).subscribe(
      data => {
        this.BV = data;
        console.log(this.BV);
      },
      Error => this.ErrorToast()
    );
    this.MarketService.getperformers("WP", window["isArabic"]).subscribe(
      data => {
        this.WP = data;
        console.log(this.WP);
      },
      Error => this.ErrorToast()
    );
    console.log(this.Indices);
    this.initialized = true;
  }
  ionViewDidEnter() {
    this.dorefresh = true;
    this.refresh();
  }
  ionViewWillLeave() {
    this.dorefresh = false;
  }
  refresh() {
    this.Indices = new Array();
    this.MarketService.getindicestable().subscribe(
      data => {
        this.IndicesTable = data;
        console.log(this.IndicesTable);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.MarketService.getperformerstable().subscribe(
      data => {
        this.PerformersTable = data;
        console.log(this.PerformersTable);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.MarketService.getindices("EGX30").subscribe(
      data => {
        this.EGX30 = data;
        console.log(this.EGX30);
        // this.Indices.push(this.EGX30);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.MarketService.getindices("EGX70").subscribe(
      data => {
        this.EGX70 = data;
        console.log(this.EGX70);
        // this.Indices.push(this.EGX70);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.MarketService.getindices("EGX100").subscribe(data => {
      this.EGX100 = data;
      console.log(this.EGX100);
      //  this.Indices.push(this.EGX100);
    });
    this.MarketService.getperformers("BP", window["isArabic"]).subscribe(
      data => {
        this.BP = data;
        console.log(this.BP);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.MarketService.getperformers("BV", window["isArabic"]).subscribe(
      data => {
        this.BV = data;
        console.log(this.BV);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.MarketService.getperformers("WP", window["isArabic"]).subscribe(
      data => {
        this.WP = data;
        console.log(this.WP);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    if (this.dorefresh) {
      setTimeout(() => {
        this.refresh();
      }, 10000);
      console.log("refresh");
    }
  }
  setstockchosen(reuter: string) {
    this.stockchosen = true;
    this.reuter = reuter;
    this.anotherbool = false;
    this.goToCompanyDeatils();
  }

  resetstockchosen() {
    this.stockchosen = false;
    this.anotherbool = true;
  }

  showHideChart(i: number) {
    this.showChart = !this.showChart;
    this.index = i;
    switch (i) {
      case 0:
        this.show30 = true;
        this.show70 = false;
        this.show100 = false;
        break;
      case 1:
        this.show30 = false;
        this.show70 = true;
        this.show100 = false;
        break;
      case 2:
        this.show30 = false;
        this.show70 = false;
        this.show100 = true;
        break;
      default:
        break;
    }
  }
  getstockchosen(stockchosen) {
    this.stockchosen = stockchosen;
    console.log(this.stockchosen);
  }
  showLastFiveDays() {
    this.lastFveDays = !this.lastFveDays;
  }
  goToCompanyDeatils() {
    this.navCtrl.push(CompanydetailsComponent, {
      reuter: this.reuter,
      rootid: this.rootid,
      stockchosen: this.stockchosen
    });
  }
  ErrorToast() {
    let toast = this.ToastController.create({
      message: "Error!",
      duration: 2000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
