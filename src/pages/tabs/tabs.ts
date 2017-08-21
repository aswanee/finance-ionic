import { Component } from "@angular/core";

import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { HomePage } from "../WatchList/WatchList";
import { MarketPage } from "../market/market";
import { AlertPage } from "../alert/alert";
import { LoginComponent } from "./../login/login.component";
@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = MarketPage;
  tab3Root = ContactPage;
  tab4Root = LoginComponent;
  tab5Root = AlertPage;
  constructor() {}
}
