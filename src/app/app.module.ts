import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/WatchList/WatchList';
import {LoginComponent} from './../pages/login/login.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {CompanyService} from './company.service';
import {HttpModule,Http} from '@angular/http';
import {StockService} from './stock.service';
import {AskBidService} from './asksbids.service';
import {GetService} from './else.service';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginComponent ,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule ,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginComponent ,
    TabsPage
  ],
  providers: [
    StatusBar,
    StockService ,
    AskBidService ,
    CompanyService ,
    GetService ,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
