import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { session } from "./../../app/session.interface";
import { Storage } from "@ionic/storage";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";


@IonicPage()
@Component({
  selector: "page-switch-accounts",
  templateUrl:"switch-accounts.html" 
})
export class SwitchAccountsPage {
  Session: session;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private Storage: Storage
  ) {
    this.Session = this.navParams.get("Session");
  }
  SwitchAccountsPage(index: number) {
    for (let i = 0; i < this.Session.result.UserAccounts.length; i++) {
      if (index === i) {
        let temp = this.Session.result.UserAccounts[0];
        this.Session.result.UserAccounts[0] = this.Session.result.UserAccounts[i];
        this.Session.result.UserAccounts[i] = temp;
        this.Storage.set("session", this.Session);
        break;
      }
    }
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad SwitchAccountsPage");
  }
}
