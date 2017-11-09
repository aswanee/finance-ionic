import { Component, OnInit,ViewChild } from "@angular/core";
import { IonicPage, Tabs,NavParams,NavController} from "ionic-angular";

@IonicPage({
  // name: 'tabs-page',
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
  //PageId :string="";
  //TabRoot :number = 0;
  constructor() {
    // if(navParams.get("PageId"))
    // {
    //   var TabRoot = 0;
    //   if(navParams.get("TabRoot"))
    //   {
    //       TabRoot = navParams.get("TabRoot");
    //   }
    //   var PageId = navParams.get("PageId");
    //   this.app.getRootNav().push(PageId);
    //   this.TabRoot = TabRoot;
    // }
  }
  
  ngOnInit() {
  }

  ionSelect(TabRoot:number) {
    this.tabRef.select(TabRoot);
  }
}
