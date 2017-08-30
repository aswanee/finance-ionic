import { Component, OnInit } from "@angular/core";

import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { HomePage } from "../WatchList/WatchList";
import { MarketPage } from "../market/market";
import { AlertPage } from "../alert/alert";
import { LoginComponent } from "./../login/login.component";
import { language } from "./../settings/settings";
import { TranslateService, TranslatePipe } from "ng2-translate";
import { TradingPage } from "./../trading/trading";
@Component({
  templateUrl: "tabs.html"
})
export class TabsPage implements OnInit {
  tab1Root = HomePage;
  tab2Root = MarketPage;
  tab3Root = ContactPage;
  tabroot6 = TradingPage;
  constructor(private TranslateService: TranslateService) {}
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.TranslateService.use(language);
  }
}
