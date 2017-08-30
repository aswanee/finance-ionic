import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { CompanyService } from "./../../app/company.service";
import { News } from "./../../app/news.interface";
import { Newsbody } from "./../../app/newsbody.interface";
import { Newsresponse } from "./../../app/newsresponse.interface";
import { Newsdetailsresponse } from "./../../app/newsdetailsresponse.interface";
import { Observable } from "rxjs/Rx";
import { TranslatePipe, TranslateService } from "ng2-translate";
import { language } from "./../settings/settings";
import { NewsdetailsComponent } from "./../newsdetails/newsdetails.component";
@Component({
  selector: "page-contact",
  templateUrl: "contact.html"
})
export class ContactPage implements OnInit {
  News: Newsresponse;
  Newsbody: Newsdetailsresponse;
  showdetails = false;
  date: Date = new Date("2017-7-1");
  elements: Element;
  id: string;
  constructor(
    public navCtrl: NavController,
    private CompanyService: CompanyService,
    private TranslateService: TranslateService
  ) {
    this.CompanyService.getnews(this.date, 100, false).subscribe(data => {
      this.News = data;
      // console.log(this.News);
    });
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.TranslateService.use(language);
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
}
