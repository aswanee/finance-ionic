import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { StockService } from "./../../app/stock.service";
import { AlertService } from "./../../app/alert.service";
import { alertresponse, alert } from "./../../app/alert.interface";

/**
 * Generated class for the AlertPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-alert",
  templateUrl: "alert.html"
})
export class AlertPage {
  private alertForm: FormGroup;
  addAlertForm: boolean = false;
  dispnames: any[][] = new Array();
  userAlerts: alertresponse;
  userId: number = 24186;
  alertsLastDate = new Date("1999-9-10");
  matchedAlerts: alert[];
  nonMatchedAlerts: alert[];

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
  }

  ngOnInit() {
    console.log(this.alertsLastDate);
    this.getAlerts();
  }

  getAlerts() {
    // TODO: should handle if a none user sent a that request.
    // show sth like "you are not a user"
    this.AlertService
      .getUseralerts(this.userId, this.alertsLastDate)
      .subscribe(data => {
        this.matchedAlerts = data.result[0].filter(item => {
          return item.IsMatched;
        });
        this.nonMatchedAlerts = data.result[0].filter(item => {
          return !item.IsMatched;
        });
      });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad AlertPage");
  }

  addAlert() {
    console.log(this.alertForm.value);
  }
}
