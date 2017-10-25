import { Component, Output, EventEmitter } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ViewController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { ToastController } from "ionic-angular";
import { AboutPage } from "./../about/about";
import { SettingsPage } from "./../settings/settings";
import { AlertPage } from "./../alert/alert";
//import { HomePage } from "./../WatchList/WatchList";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
import { AuthProvider } from "./../../providers/auth/auth";
import { session , User } from "./../../app/session.interface";
import { SigninPage } from "../signin/signin";
import { TabsPage } from "../tabs/tabs";

import { SwitchAccountsPage } from "./../switch-accounts/switch-accounts";
@Component({
  templateUrl:"pop-over.html"
})
export class PopoverPage {
  @Output() onLogout = new EventEmitter<boolean>();
  get loggedIn(): boolean {
    if(this.Session && this.Session.result && this.Session.result.GeneralInfo.UserID > 0)
    return true;
    else return false;
  }
  rootPage: any = TabsPage;
  multiaccounts: boolean = false;
  Session: session ;
  ChosenAccount: string = "";
  constructor(
    public viewCtrl: ViewController,
    private navController: NavController,
    private storage: Storage,
    private toastCtrl: ToastController,
    private Auth : AuthProvider
  ) 
  {
    // this.navController.setRoot(HomePage);
    this.Session = Auth.getUserInfo();
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
      //this.navController.setRoot(this.rootPage);
      //this.navController.popToRoot();
      this.close();
    });
  }

  goToAbout() {
    this.navController.push(AboutPage);
    this.close();
  }

  goToSettings() {
    this.navController.push(SettingsPage);
    this.close();
  }

  goToAlerts() {
    this.navController.push(AlertPage);
    this.close();
  }

  login() {
    this.navController.push(SigninPage);
    this.close();
  }
  gotoSwitch() {
    this.navController.push(SwitchAccountsPage, { Session: this.Session });
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
