export let usertoken: token;
import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { NavController } from "ionic-angular";
import { token } from "./../../app/token.interface";
import { LoginService } from "./../../app/login.service";
@Component({
  //  moduleId: module.id,
  selector: "login",
  templateUrl: "login.component.html"
  //  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {
  // token: token;
  Username: string;
  password: string;
  constructor(
    public navCtrl: NavController,
    private LoginService: LoginService
  ) {}
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    if (
      changes["Username"] &&
      changes["Username"].currentValue &&
      changes["password"] &&
      changes["password"].currentValue
    ) {
      this.LoginService
        .getmarketsummary(this.Username, this.password)
        .subscribe(data => {
          usertoken = data;
          //   console.log(data);
          console.log(usertoken);
        });
    } else {
    }
  }
}
