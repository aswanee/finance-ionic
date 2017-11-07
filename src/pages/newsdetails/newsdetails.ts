import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, Input, Output, OnInit } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { ToastController } from "ionic-angular";

import { session } from "./../../app/session.interface";
import { News } from "./../../app/news.interface";
import { Newsbody } from "./../../app/newsbody.interface";
import { Newsresponse } from "./../../app/newsresponse.interface";
import { Newsdetailsresponse } from "./../../app/newsdetailsresponse.interface";

import { CompanyService } from "./../../app/company.service";
import { FavoritesService } from "./../../app/favorite.service";
import { AuthProvider } from './../../providers/auth/auth';
import { AddFavorites } from './../../app/newsbody.interface';

@IonicPage()
@Component({
  selector: 'page-newsdetails',
  templateUrl: 'newsdetails.html',
})
export class NewsdetailsPage {
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

  
  //private _session: session;
  // get token(): session {
  //   var t: session = null;
  //   try {
  //     t = <session>window["session"];
  //   } catch (e) {
  //     this.ErrorToast("You Are Not Logged in!");
  //   }
  //   return t;
  // }
  
  pinned:boolean = false;
  FavID = 0;
  id: string;
  Newsbody: Newsdetailsresponse;
  elements: Element;
  isFired = false;
  constructor(
    private CompanyService: CompanyService,
    private NavController: NavController,
    public navParams: NavParams,
    private ToastController: ToastController,
    private Favo : FavoritesService,
    private Auth: AuthProvider
    
  ) {
    this.id = navParams.get("id");
  }

  /*
  ngOnInit() {
    
  }
  */
  LangDirection:string 
  
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    var UserID = 0;
    if(this.Auth.CurrentSession && this.Auth.CurrentSession.result 
      && this.Auth.CurrentSession.result && this.Auth.CurrentSession.result.GeneralInfo.UserID)
      {
        UserID = this.Auth.CurrentSession.result.GeneralInfo.UserID
      }

    const parsed = Number(this.id);
    this.CompanyService.getnewsdetails(parsed,UserID).subscribe(
      data => {
        this.Newsbody = data;
        
        this.LangDirection = this.Newsbody.result.V[2].toLowerCase() =='true'?"rtl" : "ltr";

        var div = document.createElement("div");
        div.innerHTML = this.Newsbody.result.V[3];
        this.elements = div;
        //this.platform.setDir('rtl', true) 
        var favid :any = this.Newsbody.result.V[8];
        if(!isNaN(favid))
        {
          this.FavID = +favid;
          if(this.FavID>0)
          {
            this.pinned = true;
          }
        }
        // document.writeln(this.elements.innerHTML);
        console.log(this.elements);
        document.getElementById("id").innerHTML = this.elements.innerHTML;
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast("Error!Please Check your Connectivity and restart the application");
          this.isFired = true;
        }
      }
    );
    // this.showdetails=true;
  }

  
  ErrorToast(Message:string) {
    let toast = this.ToastController.create({
      message: Message,
      duration: 2000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
  pinThisItem()
  {
    var UserID = 0;
    if(this.Auth.CurrentSession && this.Auth.CurrentSession.result 
      && this.Auth.CurrentSession.result && this.Auth.CurrentSession.result.GeneralInfo.UserID)
      {
        UserID = this.Auth.CurrentSession.result.GeneralInfo.UserID
      }

      if(!this.pinned && UserID > 0)
      {
        this.pinned = true;
        this.Favo.AddFavorite(UserID.toString(),this.Newsbody.result.V[0]).subscribe(
          data => {
            //////////////var locData :any = data.Detail;
           //////////////////////// this.CompanyService.
            //////////////////////console.log(locDate);
          },
          Error => {
            if (!this.isFired) {
              this.ErrorToast("Error!Please Check your Connectivity and restart the application");
              this.isFired = true;
            }
          }
        );
        console.log("this.pinned =" + this.pinned);
      }
  }
  unPinThisItem()
  {
    var UserID = 0;
    if(this.Auth.CurrentSession && this.Auth.CurrentSession.result 
      && this.Auth.CurrentSession.result && this.Auth.CurrentSession.result.GeneralInfo.UserID)
      {
        UserID = this.Auth.CurrentSession.result.GeneralInfo.UserID
      }

    if(this.pinned && UserID > 0)
    {
      //this.Favo.RemoveFavorite_test(this.Newsbody.result.V[0]);
      this.Favo.RemoveFavorite(this.Newsbody.result.V[0], UserID.toString(), this.Newsbody.result.V[8]).subscribe(
        data => {
          var locDate :any = data;
          this.pinned = false;
          console.log(locDate);
        },
        Error => {
          if (!this.isFired) {
            this.ErrorToast("Error!Please Check your Connectivity and restart the application");
            this.isFired = true;
          }
        }
      );      
      console.log("this.pinned =" + this.pinned);
    }
  }
}

