import { Component, OnInit } from "@angular/core";

import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { HomePage } from "../WatchList/WatchList";
import { MarketPage } from "../market/market";
import { AlertPage } from "../alert/alert";
import { SettingsPage } from "../settings/settings";
import { LoginComponent } from "./../login/login.component";
import { language } from "./../WatchList/WatchList";
import { TranslateService, TranslatePipe } from "ng2-translate";
@Component({
  templateUrl: "tabs.html"
})
export class TabsPage implements OnInit {
  tab1Root = HomePage;
  tab2Root = MarketPage;
  tab3Root = ContactPage;
  // tab4Root = LoginComponent;
  tab5Root = SettingsPage;
  constructor(private TranslateService: TranslateService) {}
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.TranslateService.use(language);
  }
}
