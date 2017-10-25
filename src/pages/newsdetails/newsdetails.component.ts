import { Component, Input, Output, OnInit } from "@angular/core";
import { CompanyService } from "./../../app/company.service";
import { session } from "./../../app/session.interface";
import { News } from "./../../app/news.interface";
import { Newsbody } from "./../../app/newsbody.interface";
import { Newsresponse } from "./../../app/newsresponse.interface";
import { Newsdetailsresponse } from "./../../app/newsdetailsresponse.interface";
import { Observable } from "rxjs/Rx";
import { ToastController } from "ionic-angular";
import { NavController, NavParams } from "ionic-angular";
import { FavoritesService } from "./../../app/favorite.service";
import {CustNavComponent} from '../../components/cust-nav/cust-nav'

@Component({
  // moduleId: module.id,
  selector: "newsdetails",
  templateUrl: "newsdetails.component.html"
  // styleUrls: ["newsdetails.component.scss"]
})
export class NewsdetailsComponent implements OnInit {
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

  
  private _session: session;
  get token(): session {
    var t: session = null;
    try {
      t = <session>window["session"];
    } catch (e) {
      this.ErrorToast("You Are Not Logged in!");
    }
    return t;
  }
  
  pinned:boolean = false;
  id: string;
  Newsbody: Newsdetailsresponse;
  elements: Element;
  isFired = false;
  constructor(
    private CompanyService: CompanyService,
    private NavController: NavController,
    public navParams: NavParams,
    private ToastController: ToastController,
    private FavoritesService : FavoritesService
  ) {
    this.id = navParams.get("id");
  }

  /*
  ngOnInit() {
    
  }
  */
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const parsed = Number(this.id);
    this.CompanyService.getnewsdetails(parsed).subscribe(
      data => {
        this.Newsbody = data;
        var div = document.createElement("div");
        div.innerHTML = this.Newsbody.result.V[3];
        this.elements = div;
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
      if(this.token && !this.pinned)
      {
        this.pinned = true;
        this.FavoritesService.AddFavorite(this.token.result.GeneralInfo.UserID.toString(),this.Newsbody.result.V[0]).subscribe(
          data => {
            var locDate :any = data;
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
  unPinThisItem()
  {
    if(this.token && this.pinned)
    {
      this.pinned = false;
      this.FavoritesService.RemoveFavorite(this.token.result.GeneralInfo.UserID.toString(),this.Newsbody.result.V[0]).subscribe(
        data => {
          var locDate :any = data;
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
