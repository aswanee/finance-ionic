export let language: string = "en";
import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TranslateService, TranslatePipe } from "ng2-translate";
import { TradeService } from "./../../app/trade.service";
import {
  userorderhistoryresponse,
  userorderresponse
} from "./../../app/userorder.interface";
import { Detailsresponse } from "./../../app/details.interface";
import { portfolioresponse } from "./../../app/portfolio.interface";
import { USERTOKEN } from "./../login/login.component";
import { LoginService } from "./../../app/login.service";
import { token } from "./../../app/token.interface";
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage implements OnInit {
  pepperoni;
  sausage;
  mushrooms;
  userorderhistoryresponse: userorderhistoryresponse;
  userorderresponse: userorderresponse;
  portfolioresponse: portfolioresponse;
  Detailsresponse: Detailsresponse;
  language: string;
  openlanguage: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private TranslateService: TranslateService,
    private TradeService: TradeService,
    private LoginService: LoginService
  ) {}
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.LoginService.gettoken("wesimy", "Otv@1234").subscribe(data => {
    //   this.usertoken = data;
    //   console.log(this.usertoken);
    // });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingsPage");
  }
  toarab() {
    this.language = "ar";
    language = this.language;
    this.TranslateService.use(this.language);
    // this.TradeService.GetPortfolio(this.usertoken, true).subscribe(data => {
    //   this.portfolioresponse = data;
    //   console.log(this.portfolioresponse);
    // });
  }

  toen() {
    this.language = "en";
    language = this.language;
    this.TranslateService.use(this.language);
  }
  setopenlang() {
    this.openlanguage = !this.openlanguage;
  }
}
