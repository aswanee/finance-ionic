export let USERTOKEN: token = null;
import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { NavController } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { token } from "./../../app/token.interface";
import { LoginService } from "./../../app/login.service";
import { Storage } from "@ionic/storage";

import {
  alertresponse,
  alert,
  Type,
  Field,
  Criteria
} from "./../../app/alert.interface";
import { add } from "./../../app/addresponse.interface";
import { deleteresponse } from "./../../app/delete.interface";
import { language } from "./../settings/settings";
import { TranslatePipe, TranslateService } from "ng2-translate";
@Component({
  selector: "login",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  token: boolean = null;
  Username: string;
  password: string;
  alertresponse: alertresponse;
  add: add;

  deleteresponse: deleteresponse;
  constructor(
    public navCtrl: NavController,
    private LoginService: LoginService,
    private formBuilder: FormBuilder,
    private TranslateService: TranslateService,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  ngOnInit() {
    this.storage.keys().then(keys => {
      if (keys) {
        console.log("keys");
      }
    });
  }

  login() {
    this.LoginService
      .gettoken(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(data => {
        window["token"] = data;
        console.log(data);
        this.storage.set("token", data);
        this.token = true;
        USERTOKEN = data;
        //   console.log(data);
        // console.log(USERTOKEN);
        // check if authentication error
        this.navCtrl.pop();
      });
  }
}
