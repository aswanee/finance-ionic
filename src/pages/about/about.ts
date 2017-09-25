import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
// import { language } from "./../../app/app.module";
/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: "page-about",
  templateUrl: "about.html"
})
export class AboutPage {
  dorefresh = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AboutPage");
  }
}
