import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { CompanyService } from "./../../app/company.service";
import { News } from "./../../app/news.interface";
import { Newsbody } from "./../../app/newsbody.interface";
import { Newsresponse } from "./../../app/newsresponse.interface";
import { Newsdetailsresponse } from "./../../app/newsdetailsresponse.interface";
import { Observable } from "rxjs/Rx";
import { ToastController } from "ionic-angular";
import { newsRefresh,imagPath } from "./../../app/refreshconfig";
import { NewsdetailsComponent } from "./../newsdetails/newsdetails.component";
import { Events } from "ionic-angular";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
@Component({
  selector: "page-contact",
  templateUrl: "News.html"
})
export class NewsPage implements OnInit {
  News: Newsresponse;
  displayedMoreNews: Newsresponse;
  displayednews: string[][] = new Array();
  //MoreNews: Newsresponse;
  Newsbody: Newsdetailsresponse;
  showdetails = false;
  NewestDate: string = "2017-7-1";
  OldestDate: string ;
  
  //date: Date = new Date("2017-7-1");
  elements: Element;
  //initialized = false;
  //to: Date = new Date();
  //from: Date = new Date();
  //initializetofrom = false;
  id: string;
  dorefresh: boolean = true;
  isFired = false;
  nLang:number = 2;
  constructor(
    public navCtrl: NavController,
    private CompanyService: CompanyService,
    public events: Events,
    private ToastController: ToastController
  ) {  }
  ngOnInit() {

  }
  ionViewDidEnter() {
    this.dorefresh = true;
    this.displayednews = new Array();
    this.refresh();
  }
  ionViewWillLeave() {
    this.dorefresh = false;
  }



  refresh() {
    this.CompanyService.getnews(this.NewestDate, 100, this.nLang).subscribe(
      data => {
        console.log(data.result.V);
        var len :number = data.result.V.length;
        if(data.result.V.length>0)
        {
          this.NewestDate = data.result.V[0][2] + ":" + data.result.V[0][3];
        }
        if(!this.News || this.News.result.V.length==0)
        {
          this.OldestDate = data.result.V[len-1][2] + ":" + data.result.V[len-1][3];
          this.News = data;
        }
        else
        {
          this.News.result.V = [...data.result.V,...this.News.result.V];
          this.News.result.N = data.result.N;
          this.News.status = data.status;
        }
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      },()=>{
        if (this.dorefresh) {
          setTimeout(() => {
            this.refresh();
          }, newsRefresh);
        }
      }
    );

  }

  getdetails(id) {
    this.id = id;
    this.goToNewsDeatils();

    this.showdetails = true;
  }

  goToNewsDeatils() {
    this.navCtrl.push(NewsdetailsComponent, {
      id: this.id
    });
  }

  More()  {
    this.CompanyService.getnewsRange(this.OldestDate, 10, this.nLang)
      .subscribe(
        data => {
          if(data.result.V.length > 0)
          {
            var len :number = data.result.V.length;
            this.OldestDate = data.result.V[len-1][2] + ":" + data.result.V[len-1][3];
          }

          if(!this.News || this.News.result.V.length == 0)
          {
            var len :number = data.result.V.length;
            this.NewestDate = data.result.V[0][2] + ":" + data.result.V[0][3];
            this.OldestDate = data.result.V[len-1][2] + ":" + data.result.V[len-1][3];
            this.News = data;
          }
          else
          {
            this.News.result.V =[...this.News.result.V,...data.result.V];
            this.News.result.N = data.result.N;
            this.News.status = data.status;
          }
        },
        Error => {
          if (!this.isFired) {
            this.ErrorToast();
            this.isFired = true;
          }
        }
      );
  }


  SelectedSegment:string = "ArabicNews";
  getArabic()
  {

  }

  getEnglish()
  {
    
  }

  getAll()
  {
    
  }

  GetFavoret()
  {
    
  }
  
  Hide(lang:string ,_SelectedSegment:string ) : boolean
  {
    var result :boolean = false;

    return result;
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
