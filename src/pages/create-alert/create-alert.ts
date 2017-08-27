import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { StockService } from "./../../app/stock.service";
import { AlertService } from "./../../app/alert.service";
import { alertresponse, alert } from "./../../app/alert.interface";
import { Storage } from "@ionic/storage";
import { token } from "./../../app/token.interface";

/**
 * Generated class for the CreateAlertPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-create-alert",
  templateUrl: "create-alert.html"
})
export class CreateAlertPage {
  private alertForm: FormGroup;
  userId: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private StockService: StockService,
    private AlertService: AlertService
  ) {
    this.alertForm = this.formBuilder.group({
      reuter: ["", Validators.required],
      feild: ["", Validators.required],
      criteria: ["", Validators.required],
      value: ["", Validators.required],
      note: [""]
    });
    this.userId = navParams.get("userId");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CreateAlertPage");
  }

  addAlert() {
    console.log(this.alertForm.value);
  }
}
