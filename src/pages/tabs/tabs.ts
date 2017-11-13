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
  TabRoot :number;

  ionViewDidLoad(){
    console.log("1- ion View Did Load");
    if(this.TabRoot!=undefined)
      this.ionSelect(this.TabRoot) ;
  }  

  ionViewWillEnter(){
    console.log("2- ion View Will Enter");
  }

  ionViewDidEnter(){
    console.log("3- ion View Did Enter");
  }

  ionViewDidLeave(){
    console.log("4- ion View Did Leave");
  }

  ionViewWillUnload(){
    console.log("5- ion View  Will Unload");
  }

  ionViewCanEnter(){
    console.log("6- ion View  Can Enter");
  }

  constructor(private navParams:NavParams) {
    if(navParams && navParams.get("TabRoot")!= undefined)
    {
       this.TabRoot = navParams.get("TabRoot");   
    }
  }
  
  ngOnInit() {
  }

  ionSelect(TabRoot:number) {
    this.tabRef.select(TabRoot);
  }
}
