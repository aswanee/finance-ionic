export let usertoken: token;
import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { NavController } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { token } from "./../../app/token.interface";
import { LoginService } from "./../../app/login.service";
import { AlertService } from "./../../app/alert.service";
import {
  alertresponse,
  alert,
  Type,
  Field,
  Criteria
} from "./../../app/alert.interface";
import { add } from "./../../app/addresponse.interface";
import { deleteresponse } from "./../../app/delete.interface";
@Component({
  selector: "login",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  token: token;
  Username: string;
  password: string;
  alertresponse: alertresponse;
  add: add;
  alert: alert = {
    AlertID: null,
    UserID: null,
    Code: "",
    Type: null,
    Field: null,
    Criteria: null,
    Value: null,
    SetTime: "",
    MetTime: "",
    Note: "",
    Viewed: null,
    IsMatched: null,
    LastUpdated: "",
    IsDeleted: null,
    DoubleValue: null
  };
  deleteresponse: deleteresponse;
  constructor(
    public navCtrl: NavController,
    private LoginService: LoginService,
    private AlertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  ngOnInit() {
    // this.AlertService.getUseralerts(24186, this.date).subscribe(data => {
    //   this.alertresponse = data;
    //   console.log(this.alertresponse);
    // });
    // this.AlertService
    //   .addalerts(
    //     2486,
    //     "ORWE",
    //     Type.AlertStockTypeIndex,
    //     Field.AlertFieldBestAsk,
    //     Criteria.AlertCriteriaEqual,
    //     5,
    //     "hello"
    //   )
    //   .subscribe(data => {
    //     this.add = data;
    //     console.log(this.add);
    //     console.log(this.alert);
    //   });
    // this.AlertService
    //   .updatealertswithticker(
    //     24186,
    //     "ORTE",
    //     2816,
    //     Type.AlertStockTypeIndex,
    //     Field.AlertFieldBestBid,
    //     Criteria.AlertCriteriaLessThan,
    //     5,
    //     "hello"
    //   )
    //   .subscribe(data => {
    //     this.deleteresponse = data;
    //     console.log(this.deleteresponse);
    //   });
    //   .subscribe(data => {
    //     this.deleteresponse = data;
    //     console.log(this.deleteresponse);
    //     console.log(this.alert);
    //   });
    // this.AlertService.deletealerts(2817).subscribe(data => {
    //   this.deleteresponse = data;
    //   console.log(this.deleteresponse);
    // });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add 'implements OnChanges' to the class.
  //   if (
  //     changes["Username"] &&
  //     changes["Username"].currentValue &&
  //     changes["password"] &&
  //     changes["password"].currentValue
  //   ) {
  //     this.LoginService
  //       .getmarketsummary(this.Username, this.password)
  //       .subscribe(data => {
  //         usertoken = data;
  //         //   console.log(data);
  //         console.log(usertoken);
  //       });
  //   } else {
  //   }
  // }

  login() {
    console.log(this.loginForm.value);
  }
}
