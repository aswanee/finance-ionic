import { Component, ViewChild, Inject,Output } from "@angular/core";
import { IonicPage, NavController, PopoverController, AlertController, ToastController } from "ionic-angular";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";


@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(NavController) nav;
  rootPage: string = "tabs-page";
  language: any;
  alert: any;
  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
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
      {
        this.platform.setDir('rtl', true)
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(this.platform.is('core') || this.platform.is('mobileweb')) {
        //this.isApp = false;
      } else 
      {
        platform.registerBackButtonAction(() => {
          console.log("you have clicked the device back button");
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
      }

      statusBar.styleDefault();

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
    // let popover = this.popoverCtrl.create(PopoverPage);
    // popover.present({
    //   ev: myEvent
    // });
  } 
   // this.nav.push(Page1);
}
