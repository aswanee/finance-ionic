import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { token } from "./../../app/token.interface";
import { Storage } from "@ionic/storage";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
/**
 * Generated class for the SwitchAccountsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-switch-accounts",
  //templateUrl: "switch-accounts.html"
  template: `
  <ion-header>
  <ion-navbar>
    <ion-title>{{'SwitchAccounts' | Language}}</ion-title>
  </ion-navbar>

</ion-header>
<ion-content>
<ion-buttons>
<button ion-item *ngFor="let item of token?.result.UserAccounts;let i=index" (click)="SwitchAccountsPage(i)">{{item}}</button>
</ion-buttons>
</ion-content>
  `
})
export class SwitchAccountsPage {
  token: token;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private Storage: Storage
  ) {
    this.token = this.navParams.get("token");
  }
  SwitchAccountsPage(index: number) {
    for (let i = 0; i < this.token.result.UserAccounts.length; i++) {
      if (index === i) {
        let temp = this.token.result.UserAccounts[0];
        this.token.result.UserAccounts[0] = this.token.result.UserAccounts[i];
        this.token.result.UserAccounts[i] = temp;
        this.Storage.set("token", this.token);
        break;
      }
    }
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad SwitchAccountsPage");
  }
}
