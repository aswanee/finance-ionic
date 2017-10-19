export let language: string = "en";
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  HostListener
} from "@angular/core";
import { NavController,AlertController ,PopoverController} from "ionic-angular";
import { watchlistRefresh } from "./../../app/refreshconfig";
import { ToastController,Platform } from "ionic-angular";
import { StockService } from "./../../app/stock.service";
import { AskBidService } from "./../../app/asksbids.service";
import { CompanyService } from "./../../app/company.service";
import { GetService } from "./../../app/else.service";
import { SerResponse } from "./../../app/response.interface";
import { Detailsresponse } from "./../../app/details.interface";
import { Newsresponse } from "./../../app/newsresponse.interface";
import { Newsdetailsresponse } from "./../../app/newsdetailsresponse.interface";
import { Storage } from "@ionic/storage";
import { CompanydetailsComponent } from "../companydetails/companydetails.component";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
import { Badge } from '@ionic-native/badge';
import { PopoverPage } from "../pop-over/pop-over";
import { SplashScreen } from "@ionic-native/splash-screen";

@Component({
  selector: "page-home",
  templateUrl: "WatchList.html"
})
export class HomePage implements OnInit {

  isSmall: boolean = false;
  List: SerResponse;
  StockDetails: SerResponse;
  reuter: string;
  Asks: SerResponse;
  Bids: SerResponse;
  Trades: Detailsresponse;
  editpressed: boolean = false;
  stockchosen: boolean = false;
  rootid: number = 2;
  showasksbids: boolean = false;
  showtrades: boolean = false;
  showCompanyDetails: boolean;
  hidewatchlast = this.stockchosen || this.editpressed;
  showrelatednews: boolean = false;
  initialized: boolean = true;
  initializedref: boolean = false;
  dorefresh = false;
  isArabic: boolean = false;

  News: Newsresponse;
  relNews: Newsresponse;
  Newsbody: Newsdetailsresponse;
  isFired: boolean = false;
  dispnames: string[] = new Array();
  WatchListChanged : boolean = false;

  displayList: string[][] = new Array();
  displayListDummy: string[][] = new Array();
  map: { [reuter: string]: Boolean } = {};

  hideSplash:boolean=false;

  presentPopover(myEvent) {
    // let popover = this.popoverCtrl.create(PopoverPage);
    // popover.present({
    //   ev: myEvent
    // });
  }
  constructor(
    public navCtrl: NavController,
    private StockService: StockService,
    private CompanyService: CompanyService,
    private AskBidService: AskBidService,
    private GetService: GetService,
    private storage: Storage,
    private ToastController: ToastController,
    private platform:Platform,
    private alert:AlertController,
    private badge: Badge,
    public popoverCtrl: PopoverController,
    public splashScreen: SplashScreen,
  ) 
  {
    //this.onNotification();
    platform.ready().then(() => {
      //this.requestPremission();
      
      if(!this.platform.is('core') && !this.platform.is('mobileweb')) 
      {
        
        // this.hideSplash = true;
        //FCMPlugin.onTokenRefresh( onTokenRefreshCallback(token) );
        //Note that this callback will be fired everytime a new token is generated, including the first time.
        FCMPlugin.onTokenRefresh(function(token){
          //window["FCMToken"] = token;
          console.log("token IS :[" + token + "]");
        });
  
        FCMPlugin.getToken(function(token){
          //window["FCMToken"] = token;
          console.log("token IS :[" + token + "]");
        });
  
        FCMPlugin.onNotification((data)=>{
            this.increaseBadges();        
            console.log(data);
            this.alert.create({message:data.message}).present();
          },(error)=> 
          {
            console.error(error);
          }
        );
      }
    });
  }

  async setBadges(num: number){
    try{
      let badges = await this.badge.set(num);
      console.log("badges:");
      console.log(badges);
    }catch(e)
    {
      console.error(e);
    }
  }

  async increaseBadges(){
    try{
      let hasPermissio = await this.badge.hasPermission();
      console.log(hasPermissio);
      
      if(hasPermissio)
      {
        let badges = await this.badge.increase(1);
        console.log("badges:");
        console.log(badges);
      }
      else{
        console.log("YOU DONT HAVE PERMISSION!!!");
        
      }
    }catch(e)
    {
      console.error(e);
    }
  }

  async requestPremission_XXX() {
    try{
      let hasPermissio = await this.badge.hasPermission();
      console.log("hasPermissio:");
      console.log(hasPermissio);
      
      if(!hasPermissio)
      {
        let permissio = await this.badge.registerPermission();
        console.log("permissio");
        console.log(permissio) ;
        
       }
       else
       {
         this.setBadges(10);
       }
     }
    catch(e)
    {
      console.error(e);
    }
  }

  async onNotification_XXX()
  {
    try{
 
      //console.log("--- Begin Notification ---")
      await this.platform.ready();

      FCMPlugin.onNotification((data)=>{
          console.log("wasTapped")
          this.alert.create({message:data.message}).present();
        },(error)=> 
        {
          console.error(error);
        }
      );

      //FCMPlugin.onTokenRefresh( onTokenRefreshCallback(token) );
      //Note that this callback will be fired everytime a new token is generated, including the first time.
      // FCMPlugin.onTokenRefresh(function(token){
      //   window["FCMToken"] = token;
      //   console.log(token);
      // });

      // FCMPlugin.getToken(function(token){
      //   window["FCMToken"] = token;
      //   console.log(token);
      // });
    }
    catch(e)
    {
      console.error(e);
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    //console.log("Width: " + event.target.innerWidth);
    this.isSmall = event.target.innerWidth < 414 ? true : false;
  }

  FillCompaniesList(data:any){
    this.List = data;
    for (let i = 0; i < this.List.result.length; i++) {
      // are chosen alias
      this.map[this.List.result[i][0]] = false; // OK
      var company:string[] = [this.List.result[i][0],this.List.result[i][1]]
      this.displayList.push(company);
      this.displayListDummy.push(company);
    }
    this.editpressed = false;
    this.storage.keys().then(keys => {
      if (keys) {
        keys.forEach(key => {
          if (key === "watchList") {
            this.storage.get("watchList").then(val => {
              if(val.length>0)
              {
                this.StockService.getstockv2(val,this.StockDetails, this.isArabic).subscribe(
                  data => {
                    this.StockDetails = data;
                    this.dispnames = val;
                  },
                  Error => {
                    if (!this.isFired) {
                      this.ErrorToast();
                      this.isFired = true;
                    }
                  }
                );
                this.editpressed = false;
              }
            });
          }
        });
      } 
      else 
      {
        this.StockService.getstockv2(this.dispnames,this.StockDetails, this.isArabic).subscribe(
            data => {
            this.StockDetails = data;
            this.dispnames = [
              this.List.result[0][0],
              this.List.result[1][0]
            ];
           },
          Error => {
            if (!this.isFired) {
              this.ErrorToast();
              this.isFired = true;
            }
          }
        );
        this.editpressed = false;
      }
    });
  }

  ngOnInit() {
    if(localStorage.getItem("language"))
    {
      if(localStorage.getItem("language")== "ar")
      {
        window["language"] =  "ar";
        window["isArabic"] = true;
      }
      else if(localStorage.getItem("language")== "en")
      {
        window["language"] =  "en";
        window["isArabic"] = false;
      }
    }

    if(!localStorage.getItem("language"))
    {
        window["language"] =  "ar";
        window["isArabic"] = true;       
        localStorage.setItem('language', "ar");
        localStorage.setItem('isArabic', "true");
    }
    this.isArabic = window["isArabic"];
  
    this.storage.get("token").then(val => {
      window["token"] = val;
    });

   this.StockService.getnames(this.isArabic).subscribe(
      data => {
        this.FillCompaniesList(data);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.initializedref = true;
  }
  ionViewDidEnter() {
    this.dorefresh = true;
    if (this.dispnames) {
      this.refresh();
    }
    this.splashScreen.hide();

  }
  ionViewWillLeave() {
    this.dorefresh = false;
  }
  getColore():string{
    return "test";
  }
  refresh() {
    var TempStockDetails :SerResponse = <SerResponse>{result: [], status:''};
    
    if (this.dispnames && !this.WatchListChanged) {
      if(this.dispnames.length>0)
      {
        
        //this.StockService.getstock(this.dispnames, this.isArabic).subscribe(
        this.StockService.getstockv2(this.dispnames,this.StockDetails, this.isArabic).subscribe(
          data => {
              var oldStockdata:any = this.StockDetails;
              this.StockDetails = data;
              if(this.List && this.List.result && this.List.result.length<=0)
              {
                this.FillCompaniesList(data);
              }
          },
          Error => {
            if (!this.isFired) {
              this.ErrorToast();
            }
          }
        );
  
      }
      this.isArabic = window["isArabic"];

      if (this.dorefresh) {
        setTimeout(() => {
          this.refresh();
        }, watchlistRefresh);
      }
    }
  }
  searchList(reuter: string) {
    for (let i = 0; i < this.List.result.length; i++) {
      if (this.List.result[i][0] === reuter) {
        return this.List.result[i][1];
      }
    }
  }
  changepressed() {
    this.editpressed = true;
  }

  setstockchosen(reuter: string) {
    this.stockchosen = true;
    this.reuter = reuter;
    this.goToCompanyDeatils();
  }
  falsepressed() {

    for (let i = 0; i < this.List.result.length; i++) {
      if(this.displayListDummy[i])
      {
        if (this.map[this.displayListDummy[i][0]] === true) {
          this.dispnames.push(this.displayListDummy[i][0]);
          this.displayListDummy[i] = this.displayListDummy[this.displayListDummy.length - 1];
          this.displayListDummy.pop();
        }
      }
    }
    this.displayList = this.displayListDummy;
    this.storage.set("watchList", this.dispnames);
    this.StockService.getstockv2(this.dispnames,this.StockDetails, this.isArabic).subscribe(
      data => {
        this.StockDetails = data;
        // for (let i = 0; i < this.StockDetails.result.length; i++) {
        //   this.StockDetails.result[i].push(this.dispnames[i]);
        //   this.StockDetails.result[i].push("");
        //   this.StockDetails.result[i].push(data.result[i][0]);
          
        // }
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.editpressed = false;
  }
  removeFromWatchlist(index: number) {
    // Update saved watchlist
    if (this.initialized === false) {
      this.displayListDummy.push([this.dispnames[index],""]);
    }
    this.displayListDummy.sort();
    this.map[this.dispnames[index]] = false;
    this.displayList = this.displayListDummy;
    this.dispnames.splice(index, 1);
    this.storage.set("watchList", this.dispnames);

    // Update viewed watchlist
    this.StockDetails.result.splice(index, 1);

    // TODO: mark in the adding list
  }

  // We should remove the already added elements from the add to list
  addToWatchlist() {
    this.editpressed = true;
    if (this.initialized === true) {
      for (let k = 0; k < this.dispnames.length; k++) {
        for (let i = 0; i < this.List.result.length; i++) {
          if (this.dispnames[k] === this.displayListDummy[i][0]) {
            this.map[this.displayListDummy[i][0]] = true;
            this.displayListDummy[i] = this.displayListDummy[this.displayListDummy.length - 1];
            this.displayListDummy.pop();
            break;
          }
        }
      }
      this.initialized = false;
    }

    this.displayListDummy.sort();
    this.displayList = this.displayListDummy;
  }

  //used for searching
  getItems(ev: any) {
    this.displayList = this.displayListDummy;
    if (this.displayList) {
      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != "") {
        this.displayList = this.displayList.filter(item => {
          return item[0].toLowerCase().indexOf(val.toLowerCase()) > -1 ||  item[1].toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
      }
    }
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
