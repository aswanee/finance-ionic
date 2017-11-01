import { Component, ViewChild, Inject,Output } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TabsPage } from "../pages/tabs/tabs";
import { AboutPage } from "../pages/about/about";
import { SigninPage } from "../pages/signin/signin";
//import { OneSignal } from "@ionic-native/onesignal";

import {
  IonicPage,
  NavController,
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
    //private oneSignal: OneSignal
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
      if(window["language"]=="ar")
            this.platform.setDir('rtl', true)
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(this.platform.is('core') || this.platform.is('mobileweb')) {
        //this.isApp = false;
      } else 
      {
          // this.oneSignal.startInit('a0b47b91-106c-4139-9955-ffe07d4f41e4', '12030250491');
    
          // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
          // this.oneSignal.handleNotificationReceived().subscribe(() => {
          //  // do something when notification is received
          // });
    
          // this.oneSignal.handleNotificationOpened().subscribe(() => {
          //   // do something when a notification is opened
          // });
         
          // this.oneSignal.endInit();
      }
      //For Notification


      statusBar.styleDefault();
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
