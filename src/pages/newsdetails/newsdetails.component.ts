import { Component, Input, Output, OnInit } from "@angular/core";
import { CompanyService } from "./../../app/company.service";
import { News } from "./../../app/news.interface";
import { Newsbody } from "./../../app/newsbody.interface";
import { Newsresponse } from "./../../app/newsresponse.interface";
import { Newsdetailsresponse } from "./../../app/newsdetailsresponse.interface";
import { Observable } from "rxjs/Rx";
import { ToastController } from "ionic-angular";
import { NavController, NavParams } from "ionic-angular";
@Component({
  // moduleId: module.id,
  selector: "newsdetails",
  templateUrl: "newsdetails.component.html"
  // styleUrls: ["newsdetails.component.scss"]
})
export class NewsdetailsComponent implements OnInit {
  id: string;
  Newsbody: Newsdetailsresponse;
  elements: Element;
  isFired = false;
  constructor(
    private CompanyService: CompanyService,
    private NavController: NavController,
    public navParams: NavParams,
    private ToastController: ToastController
  ) {
    this.id = navParams.get("id");
  }
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
        // console.log(this.News);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    // this.showdetails=true;
  }
  ErrorToast() {
    let toast = this.ToastController.create({
      message:
        "Error!Please Check your Connectivity and restart the application",
      duration: 2000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
