import { Component,EventEmitter,Output,Input  } from '@angular/core';
import {PopoverController } from "ionic-angular";
import { PopoverPage } from "../../pages/pop-over/pop-over";
import { HideButtonPipe } from "../../pipes/hide-button/hide-button";


@Component({
  selector: 'cust-nav',
  templateUrl: 'cust-nav.html'
})
export class CustNavComponent {
  @Input() title:string;
//xx= {BName: "menu", IconName: "menu"}
  @Input() buttons: Array<{BName: string, IconName: string, visable: boolean}>= [];
  
  @Output() pin:EventEmitter<string> = new EventEmitter();
  
  constructor(private popoverCtrl: PopoverController) {
    console.log('Hello CustNavComponent Component');
  }

  addNewEntry(Bid:string) {
    this.pin.emit(Bid);
  }
  
  Visablebuttons(): Array<{BName: string, IconName: string, visable: boolean}>
  {
    return this.buttons.filter((item) => item.visable);
  }
  
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  } 
}
