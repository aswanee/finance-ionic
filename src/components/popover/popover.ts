import { Component, Output, EventEmitter } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ViewController ,Platform} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { ToastController } from "ionic-angular";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
import { AuthProvider } from "./../../providers/auth/auth";
import { session , User } from "./../../app/session.interface";

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
  @Output() onLogout = new EventEmitter<boolean>();



  get loggedIn(): boolean {
    if(this.Session && this.Session.result && this.Session.result.GeneralInfo.UserID > 0)
    return true;
    else return false;
  }
  
  //rootPage: any = "TabsPage";
  multiaccounts: boolean = false;
  Session: session ;
  ChosenAccount: string = "";
  constructor(
    public viewCtrl: ViewController,
    private navCtrl: NavController,
    private storage: Storage,
    private toastCtrl: ToastController,
    private Auth : AuthProvider,
    private platform :Platform,
  ) 
  {
    // this.navCtrl.setRoot(HomePage);
    this.Session = Auth.getUserInfo();
    //this.text = 'Hello World';
  }

  registerBackButton :any;
  ionViewDidEnter() {
  //   console.log("ionViewDidEnter");
  //   this.registerBackButton = this.platform.registerBackButtonAction(() => {
  //     this.close();
  //  });
  }

  ionViewWillLeave() {
    // console.log("ionViewWillLeave");
    // this.registerBackButton = null;
  }


  ngOnInit() {
    
        if (this.loggedIn  ) {
          
          if (this.Session.result.UserAccounts.length === 0) {
            this.multiaccounts = false;
          } 
          else {
            this.multiaccounts = true;
          }
        }
      }
    
      logout() {
        console.log("Goodbay pop-over - logout")
        this.Auth.logout().subscribe(succ => {
          this.menuToast("out");
          this.close();
        });
      }
    
      goToAbout() {
        this.navCtrl.push("AboutPage");
        this.close();
      }
    
      goToSettings() {
        this.navCtrl.push("SettingsPage");
        this.close();
      }
    
      goToAlerts() {
        this.navCtrl.push("AlertPage");
        this.close();
      }
    
      login() {
        this.navCtrl.push("SigninPage");
        this.close();
      }
      gotoSwitch() {
        this.navCtrl.push("SwitchAccountsPage", { Session: this.Session });
        this.close();
      }
      close() {
        this.viewCtrl.dismiss();
      }
    
      menuToast(inOrOut: string) {
        let toast = this.toastCtrl.create({
          message: "You have logged " + inOrOut + " successfully",
          duration: 2000,
          position: "bottom"
        });
    
        toast.onDidDismiss(() => {
          console.log("Dismissed toast");
        });
    
        toast.present();
      }
}
