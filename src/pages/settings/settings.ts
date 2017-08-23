export let language: string = "en";
import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TranslateService, TranslatePipe } from "ng2-translate";
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  pepperoni;
  sausage;
  mushrooms;
  language: string;
  openlanguage: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private TranslateService: TranslateService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingsPage");
  }
  toarab() {
    this.language = "ar";
    language = this.language;
    this.TranslateService.use(this.language);
  }

  toen() {
    this.language = "en";
    language = this.language;
    this.TranslateService.use(this.language);
  }
  setopenlang() {
    this.openlanguage = !this.openlanguage;
  }
}
