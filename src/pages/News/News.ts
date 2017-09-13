import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { CompanyService } from "./../../app/company.service";
import { News } from "./../../app/news.interface";
import { Newsbody } from "./../../app/newsbody.interface";
import { Newsresponse } from "./../../app/newsresponse.interface";
import { Newsdetailsresponse } from "./../../app/newsdetailsresponse.interface";
import { Observable } from "rxjs/Rx";
import { TranslatePipe, TranslateService } from "ng2-translate";
// import { language } from "./../../app/app.module";
// import { isArabic } from "./../settings/settings";
import { NewsdetailsComponent } from "./../newsdetails/newsdetails.component";
import { Events } from "ionic-angular";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
@Component({
  selector: "page-contact",
  templateUrl: "News.html"
})
export class NewsPage implements OnInit {
  News: Newsresponse;
  displayedMoreNews: Newsresponse;
  displayednews: string[][] = new Array();
  MoreNews: Newsresponse;
  Newsbody: Newsdetailsresponse;
  showdetails = false;
  date: Date = new Date("2017-7-1");
  elements: Element;
  initialized = false;
  to: Date = new Date();
  from: Date = new Date();
  initializetofrom = false;
  id: string;
  dorefresh: boolean = true;
  isFired = false;
  constructor(
    public navCtrl: NavController,
    private CompanyService: CompanyService,
    private TranslateService: TranslateService,
    public events: Events
  ) {
    this.CompanyService.getnews(this.date, 100, window["isArabic"]).subscribe(
      data => {
        this.News = data;
        // console.log(this.News);
      },
      Error => {
        if (!this.isFired) {
          alert(
            "Error! Please Check your Connectivity and restart the application"
          );
          this.isFired = true;
        }
      }
    );
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.TranslateService.use(language);
    this.initialized = true;
  }
  ionViewDidEnter() {
    this.dorefresh = true;
    this.initializetofrom = false;
    this.displayednews = new Array();

    this.refresh();
  }
  ionViewWillLeave() {
    this.dorefresh = false;
  }
  refresh() {
    //  setTimeout(() => {
    //     }, 1000);
    if (this.initialized && this.News) {
      this.date = new Date(this.News.result.V[0][2]);
    }
    this.CompanyService.getnews(this.date, 100, window["isArabic"]).subscribe(
      data => {
        this.News = data;
        if (!this.initializetofrom) {
          this.to = new Date(
            this.News.result.V[this.News.result.V.length - 1][2] +
              ":" +
              this.News.result.V[this.News.result.V.length - 1][3]
          );
          this.from.setDate(this.to.getDate() - 1);
          this.initializetofrom = true;
          console.log(this.to);
          console.log(this.from);
        }

        // console.log(this.News);
      },
      Error =>
        alert(
          "Error! Please Check your Connectivity and restart the application"
        )
    );
    if (this.dorefresh) {
      setTimeout(() => {
        this.refresh();
      }, 1000);
      // console.log("refresh");
    }
  }
  getdetails(id) {
    this.id = id;
    this.goToNewsDeatils();
    //   const parsed = Number(id);
    //  this.CompanyService.getnewsdetails(parsed).subscribe(data  => {this.Newsbody = data;
    //               var div = document.createElement('div');
    //               div.innerHTML = this.Newsbody.result.V[3];
    //                this.elements = div;
    //                // document.writeln(this.elements.innerHTML);
    //                console.log(this.elements);
    //                document.getElementById('id').innerHTML = this.elements.innerHTML;
    //               // console.log(this.News);
    //            } );
    this.showdetails = true;
  }
  // back() {
  //   this.showdetails = false;
  // }
  goToNewsDeatils() {
    this.navCtrl.push(NewsdetailsComponent, {
      id: this.id
    });
  }
  More() {
    if (this.initializetofrom) {
      this.to.setDate(this.from.getDate());
      this.from.setDate(this.to.getDate() - 1);
      console.log(this.to);
      console.log(this.from);
    }
    this.CompanyService
      .getnewsRange(this.from, this.to, 10, window["isArabic"])
      .subscribe(
        data => {
          this.MoreNews = data;
          console.log(this.MoreNews);

          for (let i = 0; i < this.MoreNews.result.V.length; i++) {
            this.displayednews.push(this.MoreNews.result.V[i]);
          }
          console.log(this.displayednews);
          // this.refresh();
        },
        Error =>
          alert(
            "Error! Please Check your Connectivity and restart the application"
          )
      );
  }
}
