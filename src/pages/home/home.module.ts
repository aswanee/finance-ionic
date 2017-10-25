import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { LanguagePipe } from "../../pipes/Language/Language.pipe";
import { LimitToPipe } from "../../pipes/limit-to/limit-to";
import {CustNavComponent} from '../../components/cust-nav/cust-nav'

@NgModule({
  declarations: [
    HomePage,
    LanguagePipe,
    LimitToPipe,CustNavComponent
    
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  exports: [HomePage,LanguagePipe,LimitToPipe,CustNavComponent]
  
})
export class HomePageModule {}
