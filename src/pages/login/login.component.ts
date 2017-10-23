export let USERTOKEN: token = null;
import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { token } from "./../../app/token.interface";
import { LoginService } from "./../../app/login.service";
import { Storage } from "@ionic/storage";
import { ToastController } from "ionic-angular";

import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
import {
  alertresponse,
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
  isLogin: boolean = null;
  Username: string;
  password: string;
  alertresponse: alertresponse;
  add: add;

  deleteresponse: deleteresponse;
  constructor(
    public navCtrl: NavController,
    private LoginService: LoginService,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private ToastController: ToastController
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
      .subscribe(
        data => {
          if (data && data.result && data.result.UserID && data.result.UserID>0) {
              window["token"] = data;              
              this.storage.set("token", data);
              this.isLogin = true;
              USERTOKEN = data;
              this.navCtrl.pop();
          }

          // check if authentication error
          if (data) {
            if (data.Status === "Unauthorized") {
              this.ErrorToast("Please Enter a valid username and password");
            }
          }
        },
        Error => {
          this.ErrorToast("Error!");
        }
      );
  }
  ErrorToast(message: string) {
    let toast = this.ToastController.create({
      message: message,
      duration: 2000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
