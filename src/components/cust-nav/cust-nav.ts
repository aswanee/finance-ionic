import { Component,EventEmitter,Output, Input, OnDestroy  } from '@angular/core';


import {PopoverController } from "ionic-angular";
import { MarketService } from "./../../app/market.service";
import { PopoverComponent, } from '../popover/popover';
import { session } from "../../app/session.interface";
import { Subscription } from 'rxjs/Subscription';

//import { Events, MenuController, Nav, Platform } from 'ionic-angular';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  selector: 'cust-nav',
  templateUrl: 'cust-nav.html',

})
export class CustNavComponent implements OnDestroy {
  @Input() title:string;
  @Input() Session:session;
  @Input() buttons: Array<{BName: string, IconName: string, visable: boolean, IconColor:string}>= [];
  @Output() pin:EventEmitter<string> = new EventEmitter();
  //@Input() MarketStatus :{Status:string, Time:string}= {Status:"OK", Time:"xxxx"} ;
  @Input() MarketStatus :{Status:string, Time:string, Datetime : Date} = {Status:"CLOSE", Time:"00000",Datetime: new Date()};
  subscription: Subscription;
  
  username :string ;
  bimsid :number ;
  dir = "right";
  constructor(
    private popoverCtrl: PopoverController,
    private marketservice: MarketService
  ) {
    console.log('Hello constructor CustNavComponent Component');
    this.getstatus();
  }
	ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  counter:number = 0
  getstatus()
  {
  try{
      if(this.marketservice)
      {
         if(!this.subscription) 
         {
             this.subscription = this.marketservice.getMessage().subscribe(message => { 
              this.MarketStatus = message 
        //      if(this.counter<5000)
        //      {
        //       this.MarketStatus.Status = this.marketservice.MarketStatus.Status;
        //       this.MarketStatus.Datetime = new Date(this.MarketStatus.Datetime.setMilliseconds(1000));
        //       this.MarketStatus.Time =  new Date(this.MarketStatus.Datetime).toLocaleTimeString();
        //       this.counter += 1000;
        //       //console.log("Calc Time IS------->" + this.MarketStatus.Time)
        //     }
        //     else
        //     {
        //       this.MarketStatus = this.marketservice.MarketStatus;
        //       this.counter = 0;
        //     }
            });
         }
      }
    }
    catch(err)
    {
      console.log(err);
    }
  //   setTimeout(() => {this.getstatus();}, 10000);
    
  }
 
  addNewEntry(Bid:string) {
    this.pin.emit(Bid);
  }
  
  Visablebuttons(): Array<{BName: string, IconName: string, visable: boolean, IconColor:string}>  
  {
    if(this.buttons)
    return this.buttons.filter((item) => item.visable);
  }
  
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  } 
}
