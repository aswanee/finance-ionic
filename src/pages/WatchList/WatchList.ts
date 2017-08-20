import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {StockService} from './../../app/stock.service';
import {AskBidService} from './../../app/asksbids.service';
import {CompanyService} from './../../app/company.service';
import {GetService} from './../../app/else.service';
import {SerResponse} from './../../app/response.interface';
import {Detailsresponse} from './../../app/details.interface';
import {Newsresponse} from './../../app/newsresponse.interface';
import {Newsdetailsresponse} from './../../app/newsdetailsresponse.interface';
@Component({
  selector: 'page-home',
  templateUrl: 'WatchList.html'
})
export class HomePage implements OnInit{
List:SerResponse;
StockDetails:SerResponse;
reuter:string;
Asks:SerResponse;
Bids:SerResponse;
Trades:Detailsresponse;
editpressed: boolean=false;
stockchosen:boolean=false;
showasksbids:boolean=false;
showtrades:boolean=false;
hidewatchlast=this.stockchosen|| this.editpressed;
showrelatednews:boolean=false;
arechosen:boolean[]=new Array();
News: Newsresponse;
relNews:Newsresponse;
Newsbody: Newsdetailsresponse;
displayed:string[][]=new Array();
dispnames:string[]=new Array();
  constructor(public navCtrl: NavController,private StockService:StockService,private CompanyService:CompanyService ,private AskBidService:AskBidService ,private GetService:GetService) {
  this.StockService.getnames(true).subscribe(data  => { this.List = data;
           for (let i=0;i<this.List.result.length;i++){
           this.arechosen[i]=false;
  }
           } );
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     // console.log(this.reuter);
    this.editpressed = false;
  }

  changepressed() {
        this.editpressed = true;
        this.hidewatchlast=this.editpressed||this.stockchosen;
      }
  setstockchosen(reuter:string){
    this.stockchosen=true;
    this.hidewatchlast=this.editpressed||this.stockchosen;
    this.reuter=reuter;
  }
  //   this.CompanyService.getnewsrelated(reuter).subscribe(data=>{this.relNews=data;

  //   });
  //   this.AskBidService.getasks(reuter).subscribe(data=>{this.Asks=data;

  //   });
  //   this.AskBidService.getbids(reuter).subscribe(data=>{this.Bids=data;

  //   });
  //   this.GetService.getquotetrades(reuter,0).subscribe(data=>{this.Trades=data;

  //   });
  //   this.showrelatednews=false;

  resetstockchosen(){
    this.stockchosen=false;
    this.hidewatchlast=this.editpressed||this.stockchosen;
  }
  // setasksbids(){
  //   this.showasksbids=true;
  //   this.stockchosen=false;
  // }
  // resetasksbids(){
  //   this.showasksbids=false;
  //   this.stockchosen=true;
  // }
  // settrades(){
  //   this.showtrades=true;
  //   this.stockchosen=false;
  // }
  // resettrades(){
  //   this.showtrades=false;
  //   this.stockchosen=true;
  // }
  // setnews(){
  //   this.showrelatednews=!this.showrelatednews;
  // }
  // resetnews(){
  //   this.showrelatednews=false;
  // }
  getstockchosen(stockchosen){
 this.stockchosen=stockchosen;
 console.log(this.stockchosen);
  }
gethidewatch(stockchosen){
 this.hidewatchlast=stockchosen;
  }
  falsepressed() {
        this.displayed=[];
        this.dispnames=[];
        for(let i=0;i<this.List.result.length;i++){
          if (this.arechosen[i] === true){
            this.displayed.push(this.List.result[i]);
            this.dispnames.push(this.List.result[i][0]);
          }
        }
        console.log(this.dispnames);
        console.log(this.arechosen);
         this.StockService.getstock(this.dispnames,true).subscribe(data  => { this.StockDetails = data;
          for (let i =0;i<this.StockDetails.result.length;i++){
            this.StockDetails.result[i].push(this.dispnames[i]);
          }
          console.log(this.StockDetails);
           });
        this.editpressed = false;
        this.hidewatchlast=this.editpressed||this.stockchosen;

         }
}
