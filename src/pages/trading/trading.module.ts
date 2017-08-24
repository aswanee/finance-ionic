import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradingPage } from './trading';

@NgModule({
  declarations: [
    TradingPage,
  ],
  imports: [
    IonicPageModule.forChild(TradingPage),
  ],
})
export class TradingPageModule {}
