import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAlertPage } from './create-alert';

@NgModule({
  declarations: [
    CreateAlertPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAlertPage),
  ],
})
export class CreateAlertPageModule {}
