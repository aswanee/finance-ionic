import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwitchAccountsPage } from './switch-accounts';

@NgModule({
  declarations: [
    SwitchAccountsPage,
  ],
  imports: [
    IonicPageModule.forChild(SwitchAccountsPage),
  ],
})
export class SwitchAccountsPageModule {}
