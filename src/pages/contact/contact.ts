import { Component , OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CompanyService} from './../../app/company.service';
import {News} from './../../app/news.interface';
import {Newsbody} from './../../app/newsbody.interface';
import {Newsresponse} from './../../app/newsresponse.interface';
import {Newsdetailsresponse} from './../../app/newsdetailsresponse.interface';
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {
  News: Newsresponse;
  Newsbody: Newsdetailsresponse;
  showdetails=false;
  date: Date= new Date('2017-7-1');
  constructor(public navCtrl: NavController , private CompanyService:CompanyService) {
        this.CompanyService.getnews(this.date,100,false).subscribe(data  => {this.News = data;
          // console.log(this.News);
           } );
  }
ngOnInit() {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
}
getdetails(id:string){
  const parsed = Number(id);
 this.CompanyService.getnewsdetails(parsed).subscribe(data  => {this.Newsbody = data;
          // console.log(this.News);
           } );
 this.showdetails=true;
}
back(){
  this.showdetails=false;
}
}
