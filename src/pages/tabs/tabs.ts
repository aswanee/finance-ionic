import { Component, OnInit } from "@angular/core";

import { AboutPage } from "../about/about";
import { NewsPage } from "../News/News";
import { HomePage } from "../WatchList/WatchList";
import { MarketPage } from "../market/market";
import { AlertPage } from "../alert/alert";
import { LoginComponent } from "./../login/login.component";
import { TradingPage } from "./../trading/trading";
@Component({
  templateUrl: "tabs.html"
})
export class TabsPage implements OnInit {
  tab1Root = HomePage;
  tab2Root = MarketPage;
  tab3Root = NewsPage;
  tabroot6 = TradingPage;
  constructor() {}
  ngOnInit() {
  }
}
