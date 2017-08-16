// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {NewsdetailsComponent} from './../newsdetails/newsdetails.component';
// This Module's Components
import { CompanydetailsComponent } from './companydetails.component';

@NgModule({
    imports: [
    CommonModule,BrowserModule ,IonicModule
    ],
    declarations: [
        CompanydetailsComponent,
        NewsdetailsComponent
    ],
    exports: [
        CompanydetailsComponent,
    ]
})
export class CompanydetailsModule {

}
