import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { CommonModule } from "@angular/common";
import { NewsdetailsComponent } from "./../pages/newsdetails/newsdetails.component";
import { AboutPage } from "../pages/about/about";
//import { NewsPage } from "../pages/news/news";
import { AlertPage } from "../pages/alert/alert";
//import { WatchList } from "../pages/WatchList/WatchList";
import { HomePageModule } from "../pages/home/home.module";
import { Storage } from "@ionic/storage";
import { ChartPage } from "../pages/chart/chart";
import { MarketPage } from "../pages/market/market";
import { TradeService } from "./trade.service";
import { SettingsPage } from "../pages/settings/settings";
import { CompanydetailsComponent } from "../pages/companydetails/companydetails.component";
import { TabsPage } from "../pages/tabs/tabs";
import { MarketService } from "./market.service";
import { CreateAlertPage } from "../pages/create-alert/create-alert";
import { UpdateAlertPage } from "../pages/update-alert/update-alert";
import { OrderhistoryPage } from "./../pages/orderhistory/orderhistory";
import { PopoverPage } from "./../pages/pop-over/pop-over";
import { SwitchAccountsPage } from "./../pages/switch-accounts/switch-accounts";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { CompanyService } from "./company.service";
import { HttpModule, Http } from "@angular/http";
import { StockService } from "./stock.service";
import { AskBidService } from "./asksbids.service";
import { GetService } from "./else.service";
import { ChartModule } from "angular2-highcharts";
//import { LoginService } from "./login.service";
import { IonicStorageModule } from "@ionic/storage";
import { AlertService } from "./alert.service";
import { PopOverPageModule } from "../pages/pop-over/pop-over.module";
import { Badge } from '@ionic-native/badge';
import { FavoritesService } from "./favorite.service";
import { aroundToPipe } from "./../pipes/around-to/around-to";
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import {AutocompletePage} from '../pages/autocomplete/autocomplete'
import { AuthProvider } from '../providers/auth/auth';
import { SigninPage } from "../pages/signin/signin";
import { OnlinetradingPage } from "../pages/onlinetrading/onlinetrading";
import { HideButtonPipe } from "./../pipes/hide-button/hide-button";

export function highchartsFactory():HighchartsStatic {
  const hc =  require("highcharts/highstock");
  const hcm = require('highcharts/highcharts-more');
  const exp = require('highcharts/modules/exporting');
  hcm(hc);
  exp(hc);

  return hc;
}
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    //NewsPage,
    TabsPage,
    NewsdetailsComponent,
    CompanydetailsComponent,
    ChartPage,
    MarketPage,
    AlertPage,
    PopoverPage,
    SettingsPage,
    OnlinetradingPage,
    SwitchAccountsPage,
    OrderhistoryPage,
    CreateAlertPage,
    UpdateAlertPage,
    aroundToPipe,
    AutocompletePage,
    SigninPage,
    HideButtonPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ChartModule, 
    IonicStorageModule.forRoot(),
    PopOverPageModule,
    HomePageModule
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    AboutPage,
    //NewsPage,
    TabsPage,
    NewsdetailsComponent,
    CompanydetailsComponent,
    SwitchAccountsPage,
    ChartPage,
    MarketPage,
    AlertPage,
    SettingsPage,
    OnlinetradingPage,
    CreateAlertPage,
    PopoverPage,
    UpdateAlertPage,
    OrderhistoryPage,
    AutocompletePage,
    OnlinetradingPage,
    SigninPage
  ],
  providers: [
    StatusBar,
    StockService,
    AskBidService,
    AlertService,
    TradeService,
    CompanyService,
    //LoginService,
    MarketService,
    GetService,
    SplashScreen,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    Badge,
    FavoritesService,
    AuthProvider
  ],  
  exports: [
  ]
  
})
export class AppModule {}
