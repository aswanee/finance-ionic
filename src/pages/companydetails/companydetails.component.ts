import { Component , OnInit ,Input,Output,EventEmitter} from '@angular/core';
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
    // moduleId: module.id,
    selector: 'companydetails',
    templateUrl: 'companydetails.component.html',
    // styleUrls: ['companydetails.component.scss']
})
export class CompanydetailsComponent implements OnInit{
@Input()reuter: string;
@Input()id:string
@Input()hidewatchlast:boolean
@Input() stockchosen
@Output() send: EventEmitter<boolean> = new EventEmitter<boolean>();
@Output() sendhide: EventEmitter<boolean> = new EventEmitter<boolean>();
// stockchosen:boolean=false;
showasksbids:boolean=false;
showtrades:boolean=false;
showrelatednews:boolean=false;
showdetails:boolean=false;
Asks:SerResponse;
Bids:SerResponse;
Trades:Detailsresponse;
relNews:Newsresponse;
constructor(private CompanyService:CompanyService,private AskBidService:AskBidService,private GetService:GetService){

}
ngOnInit() {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.


    this.showrelatednews=false;
}

  setasksbids(){
      this.AskBidService.getasks(this.reuter).subscribe(data=>{this.Asks=data;
    console.log(this.Asks);
    });
    this.AskBidService.getbids(this.reuter).subscribe(data=>{this.Bids=data;
     console.log(this.Bids);
    })
    this.showasksbids=true;
    this.stockchosen=false;
     this.send.emit(this.stockchosen);
     console.log(this.stockchosen);
     console.log(this.showasksbids);
     console.log(this.Asks);
  }
  resetasksbids(){
    this.showasksbids=false;
    this.stockchosen=true;
    this.send.emit(this.stockchosen);
  }
  settrades(){
    this.GetService.getquotetrades(this.reuter,0).subscribe(data=>{this.Trades=data;

    });
    this.showtrades=true;
    this.stockchosen=false;
    this.send.emit(this.stockchosen);
  }
  resettrades(){
    this.showtrades=false;
    this.stockchosen=true;
    this.send.emit(this.stockchosen);
  }
  setnews(){
    this.CompanyService.getnewsrelated(this.reuter).subscribe(data=>{this.relNews=data;

    });
    this.showrelatednews=!this.showrelatednews;
  }
  getdetails(id){
  this.id=id;
//   const parsed = Number(id);
//  this.CompanyService.getnewsdetails(parsed).subscribe(data  => {this.Newsbody = data;
//               var div = document.createElement('div');
//               div.innerHTML = this.Newsbody.result.V[3];
//                this.elements = div;
//                // document.writeln(this.elements.innerHTML);
//                console.log(this.elements);
//                document.getElementById('id').innerHTML = this.elements.innerHTML;
//               // console.log(this.News);
//            } );
 this.showdetails=!this.showdetails;
}
// back(){
//   this.showdetails=false;
// }
// resetstockchosen(){
//     this.stockchosen=false;
//     this.hidewatchlast=false||this.stockchosen;
//     this.sendhide.emit(this.hidewatchlast);
//   }
}
