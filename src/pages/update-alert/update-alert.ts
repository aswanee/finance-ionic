import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AlertService } from "./../../app/alert.service";
import {
  alertresponse,
  alert,
  Type,
  Criteria,
  Field
} from "./../../app/alert.interface";
import { Storage } from "@ionic/storage";
import { token } from "./../../app/token.interface";

/**
 * Generated class for the UpdateAlertPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-update-alert",
  templateUrl: "update-alert.html"
})
export class UpdateAlertPage {
  Types: String[] = ["Index", "Stock", "OTC"];
  Fields: String[] = [
    "Last Trade",
    "Net Change",
    "Percentage Change",
    "VWAP",
    "Best Bid",
    "Best Ask",
    "Bid Size",
    "Ask Size",
    "Volume",
    "TurnOver",
    "Transactions",
    "High",
    "Low",
    "Total Bid Size",
    "Total Ask Size",
    "Value",
    "Intraday High",
    "Intraday Low"
  ];
  Criterias: String[] = ["Less Than", "Equal", "Greater Than"];

  private alertForm: FormGroup;

  userId: number;
  alertId: number;
  reuter: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private AlertService: AlertService
  ) {
    this.alertForm = this.formBuilder.group({
      feild: ["", Validators.required],
      type: ["", Validators.required],
      criteria: ["", Validators.required],
      value: ["", Validators.required],
      note: [""]
    });
    this.userId = navParams.get("userId");
    this.alertId = navParams.get("alertId");
    this.reuter = navParams.get("reuter");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UpdateAlertPage");
  }
  updateAlert() {
    this.AlertService
      .updatealerts(
        this.userId,
        this.reuter,
        this.alertId,
        this.Types.indexOf(this.alertForm.value.type.toString()),
        this.Fields.indexOf(this.alertForm.value.feild.toString()),
        this.Criterias.indexOf(this.alertForm.value.criteria.toString()),
        this.alertForm.value.value,
        this.alertForm.value.note.toString()
      )
      .subscribe(data => {
        console.log(data);
        this.navCtrl.popToRoot();
      });
  }
}
