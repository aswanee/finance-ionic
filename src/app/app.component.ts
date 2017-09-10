import { Component, ViewChild } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { TabsPage } from "../pages/tabs/tabs";
import { AboutPage } from "../pages/about/about";
import { NavController } from "ionic-angular";
import {
  PopoverController,
  ToastController,
  AlertController
} from "ionic-angular";
import { PopoverPage } from "../pages/pop-over/pop-over";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = TabsPage;
  language: any;
  alert: any;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.alert = this.alertCtrl.create({
      title: "Exit?",
      message: "Do you want to exit the app?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            this.alert = null;
          }
        },
        {
          text: "Exit",
          handler: () => {
            platform.exitApp();
          }
        }
      ]
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      platform.registerBackButtonAction(() => {
        if (this.navCtrl.canGoBack()) {
          this.navCtrl.pop();
        } else {
          if (this.alert) {
            this.alert.dismiss();
            this.alert = null;
          } else {
            this.showAlert();
          }
        }
      });
    });
  }

  showAlert() {
    this.alert.present();
  }

  showToast() {
    let toast = this.toastCtrl.create({
      message: "Press Again to exit",
      duration: 2000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  // this.nav.push(Page1);
}
