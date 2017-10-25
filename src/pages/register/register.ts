import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustNavComponent} from '../../components/cust-nav/cust-nav'


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  GetCustNavID(event) {
    switch(event)
    {
      case "notifications":
        console.log(event);
        break;
      case "add":
        console.log(event);
        break;
      case "checkmark":
        console.log(event);
        break;
    }
  }

  buttons: Array<{BName: string, IconName: string, visable: boolean}> = 
  [
    // {BName: "notifications", IconName: "notifications"},
    // {BName: "add", IconName: "add"},
    // {BName: "checkmark", IconName: "checkmark"}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
