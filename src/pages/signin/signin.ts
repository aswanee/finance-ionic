import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController, LoadingController, Loading} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User , session } from '../../app/session.interface';
import { ViewChild, OnInit } from "@angular/core";
import { IonicPage, } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

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

  
  loading: Loading;
  registerCredentials :User;
  //ParentPage :string;
  
  constructor(private navCtrl: NavController, 
    private auth: AuthProvider, 
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,
    public navParams: NavParams)
  { 
    //this.ParentPage = navParams.get("ParentPage");
    this.registerCredentials = new User("","");
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        var returnPage =this.navParams.get("ParentPage");
        if(!returnPage)
            returnPage = "OnlinetradingPage";

        //this.navCtrl.pop();
        this.navCtrl.setRoot(returnPage);
        //this.navCtrl.push(OnlinetradingPage);
        
      } else {
        this.showError("Access Denied");   
      }
    },
      error => {
        this.showError(error);
      });
  }

  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
