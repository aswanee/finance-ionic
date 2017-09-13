import { Component, ViewChild, Inject } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TabsPage } from "../pages/tabs/tabs";
import { AboutPage } from "../pages/about/about";
import { OneSignal } from "@ionic-native/onesignal";

import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  AlertController,
  ToastController
} from "ionic-angular";

import { PopoverPage } from "../pages/pop-over/pop-over";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(NavController) nav;
  rootPage: any = TabsPage;
  language: any;
  alert: any;
  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public popoverCtrl: PopoverController,
    // public navCtrl: Nav,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private oneSignal: OneSignal
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

      // var notificationOpenedCallback = function(jsonData) {
      //   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      // };

      // window["plugins"].OneSignal
      //   .startInit("09eba30b-641e-4d7b-97c9-78566376acfe", "1097286062230")
      //   .handleNotificationOpened(notificationOpenedCallback)
      //   .endInit();

      // this.oneSignal.startInit(
      //   "09eba30b-641e-4d7b-97c9-78566376acfe",
      //   "1097286062230"
      // );

      // this.oneSignal.inFocusDisplaying(
      //   this.oneSignal.OSInFocusDisplayOption.InAppAlert
      // );

      // this.oneSignal.handleNotificationReceived().subscribe(() => {
      //   // do something when notification is received
      // });

      // this.oneSignal.handleNotificationOpened().subscribe(() => {
      //   // do something when a notification is opened
      // });

      // this.oneSignal.endInit();

      statusBar.styleDefault();
      splashScreen.hide();
      platform.registerBackButtonAction(() => {
        if (this.nav.canGoBack()) {
          this.showToast();
          platform.exitApp();
          this.nav.pop();
        } else {
          this.showToast_2();
          platform.exitApp();
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

  showToast_2() {
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
