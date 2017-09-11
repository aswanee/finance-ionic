import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { StockService } from "./../../app/stock.service";
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
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
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
  Types: String[] = ["Index", "Stock", "OTC"];
  Fields: any = new Array(
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
  );
  Criterias: any = new Array("Less Than", "Equal", "Greater Than");

  private alertForm: FormGroup;
  types: Type;
  types_num: number[];
  fields: Field;
  criterias: Criteria;
  reuters: string[] = new Array();
  userId: number;
  update: boolean;

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
      type: ["", Validators.required],
      criteria: ["", Validators.required],
      value: ["", Validators.required],
      note: [""]
    });
    this.userId = navParams.get("userId");
    this.update = navParams.get("userId");
  }

  ngOnInit() {
    this.StockService.getnames(true).subscribe(data => {
      var d = data.result;
      var length = d.length;
      for (var index = 0; index < length; index++) {
        this.reuters.push(d[index][0]);
      }
    });

    console.log(Criteria.AlertCriteriaEqual);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CreateAlertPage");
  }

  addAlert() {
    // if (this.reuters.indexOf(this.alertForm.value.reuter.toString()) > 0) {

    console.log(this.reuters.indexOf(this.alertForm.value.reuter.toString()));
    console.log(this.reuters);
    this.AlertService
      .addalert(
        this.userId,
        this.alertForm.value.reuter.toString(),
        this.Fields.indexOf(this.alertForm.value.feild.toString()),
        this.Types.indexOf(this.alertForm.value.type.toString()),
        this.Criterias.indexOf(this.alertForm.value.criteria.toString()),
        this.alertForm.value.value,
        this.alertForm.value.note
      )
      .subscribe(data => {
        console.log(data);
        this.navCtrl.popToRoot();
      });

    // } else {
    // console.log("company not found");
    // }
  }

  // forbiddenNameValidator(nameRe: String): ValidatorFn {
  //   return (control: AbstractControl): {[key: string]: any} => {
  //     const forbidden = nameRe.test(control.value);
  //     return forbidden ? {'forbiddenName': {value: control.value}} : null;
  //   };
  // }
}
