import { Component, ViewChild } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { TabsPage } from "../pages/tabs/tabs";
import { AboutPage } from "../pages/about/about";
import { NavController } from "ionic-angular";
import { PopoverController } from "ionic-angular";
import { PopoverPage } from "../pages/pop-over/pop-over";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = TabsPage;
  language: any;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public popoverCtrl: PopoverController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  // this.nav.push(Page1);
}
