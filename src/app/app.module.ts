import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { CommonModule } from "@angular/common";
import { NewsdetailsComponent } from "./../pages/newsdetails/newsdetails.component";
import { AboutPage } from "../pages/about/about";
import { NewsPage } from "../pages/News/News";
import { AlertPage } from "../pages/alert/alert";
import { HomePage } from "../pages/WatchList/WatchList";
import { Storage } from "@ionic/storage";
import { LoginComponent } from "./../pages/login/login.component";
import { ChartPage } from "../pages/chart/chart";
import { MarketPage } from "../pages/market/market";
import { TradeService } from "./trade.service";
import { SettingsPage } from "../pages/settings/settings";
import { TradingPage } from "./../pages/trading/trading";
import { CompanydetailsComponent } from "../pages/companydetails/companydetails.component";
import { TabsPage } from "../pages/tabs/tabs";
import { MarketService } from "./market.service";
import { CreateAlertPage } from "../pages/create-alert/create-alert";
import { UpdateAlertPage } from "../pages/update-alert/update-alert";
import { OrderhistoryPage } from "./../pages/orderhistory/orderhistory";
import { PopoverPage } from "./../pages/pop-over/pop-over";
import { SwitchAccountsPage } from "./../pages/switch-accounts/switch-accounts";
import { LanguagePipe } from "./../pipes/Language/Language.pipe";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { CompanyService } from "./company.service";
import { HttpModule, Http } from "@angular/http";
import { StockService } from "./stock.service";
import { AskBidService } from "./asksbids.service";
import { GetService } from "./else.service";
import { ChartModule } from "angular2-highcharts";
import { LoginService } from "./login.service";
import { IonicStorageModule } from "@ionic/storage";
import { AlertService } from "./alert.service";
import { PopOverPageModule } from "../pages/pop-over/pop-over.module";
import { OneSignal } from '@ionic-native/onesignal';

//pipes
import { LimitToPipe } from "./../pipes/limit-to/limit-to";
import { aroundToPipe } from "./../pipes/around-to/around-to";

import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

export function highchartsFactory():HighchartsStatic {
  const hc =  require("highcharts/highstock");
  return hc;
}
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    NewsPage,
    HomePage,
    LoginComponent,
    TabsPage,
    NewsdetailsComponent,
    CompanydetailsComponent,
    ChartPage,
    MarketPage,
    AlertPage,
    PopoverPage,
    SettingsPage,
    TradingPage,
    SwitchAccountsPage,
    OrderhistoryPage,
    LimitToPipe,
    CreateAlertPage,
    UpdateAlertPage,
    aroundToPipe,
    LanguagePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ChartModule, 
    IonicStorageModule.forRoot(),
    PopOverPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    NewsPage,
    HomePage,
    LoginComponent,
    TabsPage,
    NewsdetailsComponent,
    CompanydetailsComponent,
    SwitchAccountsPage,
    ChartPage,
    MarketPage,
    AlertPage,
    SettingsPage,
    TradingPage,
    CreateAlertPage,
    PopoverPage,
    UpdateAlertPage,
    OrderhistoryPage
  ],
  providers: [
    StatusBar,
    StockService,
    AskBidService,
    AlertService,
    TradeService,
    CompanyService,
    LoginService,
    MarketService,
OneSignal,
    GetService,
    SplashScreen,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
    //{ provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
