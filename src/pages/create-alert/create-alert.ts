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
  Types: any = new Array(
    "AlertStockTypeIndex",
    "AlertStockTypeStock",
    "AlertStockTypeOTC"
  );
  Fields: any = new Array(
    "AlertFieldLastTrade",
    "AlertFieldNetChange",
    "AlertFieldPercentageChange",
    "AlertFieldVWAP",
    "AlertFieldBestBid",
    "AlertFieldBestAsk",
    "AlertFieldBidSize",
    "AlertFieldAskSize",
    "AlertFieldVolume",
    "AlertFieldTurnOver",
    "AlertFieldTransactions",
    "AlertFieldHigh",
    "AlertFieldLow",
    "AlertFieldTotAlBidSize",
    "AlertFieldTotAlAskSize",
    "AlertFieldVAlue",
    "AlertFieldIntradayHigh",
    "AlertFieldIntradayLow"
  );
  Criterias: any = new Array(
    "AlertCriteriaLessThan",
    "AlertCriteriaEqual",
    "AlertCriteriaGreaterThan"
  );

  private alertForm: FormGroup;
  types: Type;
  types_num: number[];
  fields: Field;
  criterias: Criteria;

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
      type: ["", Validators.required],
      criteria: ["", Validators.required],
      value: ["", Validators.required],
      note: [""]
    });
    this.userId = navParams.get("userId");
  }

  ngOnInit() {
    console.log(Criteria.AlertCriteriaEqual);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CreateAlertPage");
  }

  addAlert() {
    // console.log(
    //   this.AlertService.addalert(
    //     this.userId,
    //     this.alertForm.value.reuter,
    //     this.type,
    //     this.field,
    //     this.criteria,
    //     this.alertForm.value.value,
    //     this.alertForm.value.note
    //   )
    // );
    console.log(this.alertForm.value);
  }
}
