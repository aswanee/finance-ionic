import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {StockService} from './../../app/stock.service';
import {AskBidService} from './../../app/asksbids.service';
import {CompanyService} from './../../app/company.service';
import {GetService} from './../../app/else.service';
import {SerResponse} from './../../app/response.interface';
@Component({
  selector: 'page-home',
  templateUrl: 'WatchList.html'
})
export class HomePage {
List:SerResponse;
editpressed=false;
arechosen:boolean[]=new Array();
displayed:string[][]=new Array();
dispnames:string[]=new Array();
  constructor(public navCtrl: NavController,private StockService:StockService,private CompanyService:CompanyService ,privateAskBidService:AskBidService ,private GetService:GetService) {
  this.StockService.getnames(true).subscribe(data  => { this.List = data;
           for (let i=0;i<this.List.result.length;i++){
           this.arechosen[i]=false;
  }
           } );
  }
  changepressed() {
        this.editpressed = true;
      }
  falsepressed() {
  //       this.displayed=[];
  //       for(let i=0;i<this.List.result.length;i++){
  //         if (this.arechosen[i]==true){
  //           this.displayed.push(this.List.result[i]);
  //           this.dispnames.push(this.displayed[i][0]);
  //         }
  //       }
  //        this.StockService.getstock(this.dispnames,true).subscribe(data  => { this.List = data;
  //          for (let i=0;i<this.List.result.length;i++){
  //          this.arechosen[i]=false;
  // }
        this.editpressed = false;
      }
}
