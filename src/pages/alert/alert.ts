import {
  Component,
  OnChanges,
  SimpleChanges,
  HostListener
} from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { StockService } from "./../../app/stock.service";
import { AlertService } from "./../../app/alert.service";
import { alertresponse, alert } from "./../../app/alert.interface";
import { Storage } from "@ionic/storage";
import { token } from "./../../app/token.interface";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
import { CreateAlertPage } from "./../create-alert/create-alert";
import { UpdateAlertPage } from "./../update-alert/update-alert";

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
  isSmall: boolean = false;
  private alertForm: FormGroup;
  addAlertForm: boolean = false;
  dispnames: any[][] = new Array();
  userAlerts: alertresponse;
  userId: number;
  token: token;
  alertsLastDate = new Date("2017-1-10");
  matchedAlerts: alert[] = new Array();
  nonMatchedAlerts: alert[] = new Array();
  newMatchedAlerts: alert[] = new Array();
  newNonMatchedAlerts: alert[] = new Array();
  dummyAlert: alert;
  loggedin: boolean = false;
  fetchedAlerts: boolean = false;
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private StockService: StockService,
    private AlertService: AlertService,
    private storage: Storage
  ) {}
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    console.log("Width: " + event.target.innerWidth);
    this.isSmall = event.target.innerWidth < 414 ? true : false;
  }
  ngOnInit() {
    this.storage.keys().then(keys => {
      if (keys) {
        keys.forEach(key => {
          if (key === "token") {
            this.storage.get(key).then(val => {
              console.log(val);
              this.token = val;
              this.loggedin = true;
              this.userId = this.token.result.UserID;
              this.getAlerts();
            });
          } else if (key === "alerts") {
            this.storage.get(key).then(val => {
              console.log(val);
              this.matchedAlerts = val.m;
              this.nonMatchedAlerts = val.nm;
              this.alertsLastDate = val.lastUpdate;
              this.fetchedAlerts = true;
            });
          }
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["loggedin"].currentValue &&
      changes["fetchedAlerts"].currentValue
    ) {
      this.getAlerts();
    }
  }

  getAlerts() {
    // TODO: Add alerts Notifications

    // TODO: should handle if a none user sent a that request.
    // show sth like "you are not a user"

    this.AlertService
      .getUseralerts(this.userId, this.alertsLastDate)
      .subscribe(data => {
        this.newMatchedAlerts = data.result[0].filter(item => {
          return item.IsMatched;
        });
        this.newNonMatchedAlerts = data.result[0].filter(item => {
          return !item.IsMatched;
        });
        console.log(this.newMatchedAlerts);
        console.log(this.newNonMatchedAlerts);
        if (this.newNonMatchedAlerts || this.newMatchedAlerts) {
          this.storage.set("alerts", {
            m: this.matchedAlerts.concat(this.newMatchedAlerts),
            nm: this.nonMatchedAlerts.concat(this.newNonMatchedAlerts),
            lastUpdate: new Date()
          });
        }
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AlertPage");
  }

  showcreateAlertForm() {
    this.navCtrl.push(CreateAlertPage, {
      userId: this.userId,
      update: false
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  refreshAlerts() {
    this.AlertService
      .getUseralerts(this.userId, this.alertsLastDate)
      .subscribe(data => {
        this.newMatchedAlerts = data.result[0].filter(item => {
          return item.IsMatched;
        });
        this.newNonMatchedAlerts = data.result[0].filter(item => {
          return !item.IsMatched;
        });
        console.log(this.newMatchedAlerts);
        console.log(this.newNonMatchedAlerts);
        if (this.newNonMatchedAlerts || this.newMatchedAlerts) {
          this.storage.set("alerts", {
            m: this.newMatchedAlerts,
            nm: this.newNonMatchedAlerts,
            lastUpdate: new Date()
          });
        }
      });
  }

  alertDetails(index: number, IsMatched: boolean) {
    var alertId, reuter;
    if (IsMatched) {
      alertId = this.matchedAlerts[index].AlertID;
      reuter = this.matchedAlerts[index].Code;
    } else {
      alertId = this.nonMatchedAlerts[index].AlertID;
      reuter = this.matchedAlerts[index].Code;
    }
    this.navCtrl.push(UpdateAlertPage, {
      userId: this.userId,
      alertId: alertId,
      reuter: reuter
    });
    this.refreshAlerts();
  }

  deleteAlert(index: number, IsMatched: boolean) {
    var alertId, reuter;
    if (IsMatched) {
      alertId = this.matchedAlerts[index].AlertID;
      reuter = this.matchedAlerts[index].Code;
    } else {
      alertId = this.nonMatchedAlerts[index].AlertID;
      reuter = this.matchedAlerts[index].Code;
    }
    console.log(alertId);
    this.AlertService.deletealerts(alertId).subscribe(data => {
      // TODO: add toast here.
      console.log(data);

      if (data.result) {
        if (IsMatched) {
          this.matchedAlerts = this.matchedAlerts.filter(item => {
            return item.AlertID !== alertId;
          });
        } else {
          this.nonMatchedAlerts = this.nonMatchedAlerts.filter(item => {
            return item.AlertID !== alertId;
          });
        }
        this.storage.set("alerts", {
          m: this.matchedAlerts,
          nm: this.nonMatchedAlerts,
          lastUpdate: new Date()
        });
      }
    });
  }
}
