import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { LoginService } from "./../../app/login.service";
import { token } from "./../../app/token.interface";
@Component({
  //  moduleId: module.id,
  selector: "login",
  templateUrl: "login.component.html"
  //  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  token: token;
  constructor(
    public navCtrl: NavController,
    private LoginService: LoginService
  ) {}
  ngOnInit() {
    this.LoginService
      .getmarketsummary("User95", "Astrix123")
      .subscribe(data => {
        this.token = data;
        console.log(this.token);
      });
    this.LoginService.login();
  }
}
