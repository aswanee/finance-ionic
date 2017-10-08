import {Component, Input,ViewChild} from '@angular/core';
import {ViewController} from 'ionic-angular';
import { StockService } from "./../../app/stock.service";
import { SerResponse } from "./../../app/response.interface";

/**
 * Generated class for the AutocompletePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-autocomplete',
  templateUrl: 'autocomplete.html',
})

export class AutocompletePage {
  autocompleteItems;
  autocomplete;
  isArabic:boolean=true;
  List: SerResponse;
  @ViewChild('SearchInput') myInput ;

  constructor (public viewCtrl: ViewController, 
     private StockService: StockService
  ) 
  {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
    this.isArabic = window["isArabic"];
    this.StockService.getnames(this.isArabic).subscribe(
      data => {
        this.List = data;   
      }
    )
  }
  ngAfterViewChecked() {
    setTimeout(() => {
      this.myInput.setFocus();
    },150);
  }    

  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let  input: any= this.autocomplete.query.toLocaleLowerCase();
    let me = this;
    this.autocompleteItems = []; 
    this.List.result.forEach(
      function (item) 
      {
        var rauter:string = item[0].toLowerCase();
        var CompName : String = item[1].toLocaleLowerCase();
       if(rauter.includes(input) || CompName.includes(input))
       {
        me.autocompleteItems.push(item);
       }
      }
    );
          
  }
}