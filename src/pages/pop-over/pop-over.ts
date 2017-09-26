import { Component, Output, EventEmitter } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ViewController } from "ionic-angular";
import { LoginComponent } from "./../login/login.component";
import { USERTOKEN } from "./../login/login.component";
import { Storage } from "@ionic/storage";
import { ToastController } from "ionic-angular";
import { AboutPage } from "./../about/about";
import { SettingsPage } from "./../settings/settings";
import { AlertPage } from "./../alert/alert";
import { HomePage } from "./../WatchList/WatchList";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
import { token } from "./../../app/token.interface";
import { SwitchAccountsPage } from "./../switch-accounts/switch-accounts";
@Component({
  templateUrl:"pop-over.html"
//   template: `
//    <ion-list>
//     <button ion-item *ngIf="!loggedIn" (click)="login()">{{'Login' | Language}}</button>
//     <button ion-item *ngIf="loggedIn" (click)="logout()">{{'Logout' | Language}}</button>
//     <button ion-item *ngIf="loggedIn" (click)="goToAlerts()">{{'Alerts' | Language}}</button>
//     <button ion-item (click)="goToSettings()">{{'Change Language' | Language}}</button>
//     <button ion-item (click)="goToAbout()">{{'About Us title' | Language}}</button>
//     <button ion-item  (click)="gotoSwitch()" *ngIf="loggedIn&&(token?.result.UserAccounts.length>0)">{{'SwitchAccounts' | Language}}</button>
// </ion-list>
//   `
})
export class PopoverPage {
  @Output() onLogout = new EventEmitter<boolean>();
  loggedIn: boolean = false;
  multiaccounts: boolean = false;
  token: token = window["token"];
  ChosenAccount: string = "";
  constructor(
    public viewCtrl: ViewController,
    private navController: NavController,
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    // this.navController.setRoot(HomePage);
  }

  ngOnInit() {
    this.storage.keys().then(keys => {
      if (keys) {
        keys.forEach(key => {
          if (key === "token" && window["token"] && this.token) {
            if (this.token.Status === "Unauthorized") {
              this.loggedIn = false;
            } else {
              this.loggedIn = true;
              if (this.token.result.UserAccounts.length === 0) {
                this.multiaccounts = false;
              } else {
                this.multiaccounts = true;
              }
            }
          }
        });
      }
    });
  }

  logout() {
    this.loggedIn = false;
    this.storage.remove("token").then(val => {
      window["token"] = null;
      this.navController.popToRoot();
      this.close();
      this.menuToast("out");
    });
  }

  goToAbout() {
    this.navController.push(AboutPage);
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
    this.navController.push(LoginComponent);
    this.close();
  }
  gotoSwitch() {
    this.navController.push(SwitchAccountsPage, { token: this.token });
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
