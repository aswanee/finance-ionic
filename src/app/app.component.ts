import { Component, ViewChild } from "@angular/core";
import { PopoverController, AlertController, ToastController } from "ionic-angular";
import { Platform ,App } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";


@Component({
  templateUrl: "app.html"
})
export class MyApp {
  //@ViewChild(NavController) nav;
  //@ViewChild(Nav) nav: Nav;
  
  rootPage: string = "TabsPage";
  language: any;
  alert: any;
  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public  app: App,
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
      platform.registerBackButtonAction(() => {
        
           let nav = app.getActiveNavs()[0];
           let i:number = 0
           let activeView = nav.getActive(); 
           var actname = ""; //activeView.name;
           for(i ; i< app.getActiveNavs.length; i++)
           {
              actname += app.getActiveNavs()[i].name + "<br>";
           }
           console.log("A-C-T-I-V--V-I-E-W: " + actname + "-----------------------");
           //if(activeView.name === "FirstPage") 
           {
        
               if (nav.canGoBack()){ //Can we go back?
                   nav.pop();
               } else {
                   const alert = this.alertCtrl.create({
                       title: 'App termination',
                       message: 'your Active current pageis:<br>  ' + actname + '<br> Do you want to close the app?',
                       buttons: [{
                          text: 'Cancel',
                          role: 'cancel',
                          handler: () => {
                              console.log('Application exit prevented!');
                          }
                        },
                        {
                          text: 'Go To Home',
                          handler: () => {
                              this.app.getRootNav().setRoot("TabsPage",{TabRoot:0});                            
                              console.log('Application exit prevented!');
                          }
                      },
                      {
                           text: 'Close App',
                           handler: () => {
                               this.platform.exitApp(); // Close this application
                           }
                       }]
                   });
                   alert.present();
               }
           }
       },100);

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
