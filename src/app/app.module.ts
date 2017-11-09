import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { CommonModule } from "@angular/common";
import { Storage } from "@ionic/storage";
import { TradeService } from "./trade.service";
import { MarketService } from "./market.service";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { CompanyService } from "./company.service";
import { HttpModule, Http } from "@angular/http";
import { StockService } from "./stock.service";
import { AskBidService } from "./asksbids.service";
import { GetService } from "./else.service";
import { IonicStorageModule } from "@ionic/storage";
import { AlertService } from "./alert.service";
import { Badge } from '@ionic-native/badge';
import { FavoritesService } from "./favorite.service";
import { aroundToPipe } from "./../pipes/around-to/around-to";
import { AuthProvider } from '../providers/auth/auth';
import { NewsPageModule } from "../pages/news/news.module";
import {CustNavComponent} from '../components/cust-nav/cust-nav'
import { TabsPageModule } from "../pages/tabs/tabs.module";
import { OnlinetradingPageModule } from "../pages/onlinetrading/onlinetrading.module";


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    TabsPageModule,
    NewsPageModule,
    OnlinetradingPageModule,
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    StockService,
    AskBidService,
    AlertService,
    TradeService,
    CompanyService,
    MarketService,
    GetService,
    SplashScreen,
    Badge,
    FavoritesService,
    AuthProvider
  ],  
  exports: [
  ]
  
})
export class AppModule {}
