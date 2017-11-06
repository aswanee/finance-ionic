import { Component, OnInit,ViewChild } from "@angular/core";
import { IonicPage, NavController, Tabs} from "ionic-angular";

@IonicPage({
  name: 'tabs-page',
  priority: 'high'
})
@Component({
  templateUrl: "tabs.html",
  
})
export class TabsPage implements OnInit {
  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = "HomePage";
  tab2Root = "MarketPage";
  tab3Root = "NewsPage";
  tab4Root = "OnlinetradingPage";
  constructor() {}
  
  ngOnInit() {
  }

  ionSelect(TabRoot:number) {
    this.tabRef.select(TabRoot);
  }
}
