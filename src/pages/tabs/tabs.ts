import { Component, OnInit,ViewChild } from "@angular/core";

import { AboutPage } from "../about/about";
import { NewsPage } from "../news/news";
//import { WatchList } from "../WatchList/WatchList";
import { HomePage } from "../home/home";
import { MarketPage } from "../market/market";
import { AlertPage } from "../alert/alert";
import { SigninPage } from "./../signin/signin";
import { OnlinetradingPage } from "./../onlinetrading/onlinetrading";
import { NavController, Tabs} from "ionic-angular";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage implements OnInit {
  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = HomePage;
  tab2Root = MarketPage;
  tab3Root = NewsPage;
  tabroot6 = OnlinetradingPage;
  constructor() {}
  
  ngOnInit() {
  }

  ionSelect(TabRoot:number) {
    this.tabRef.select(TabRoot);
  }
}
