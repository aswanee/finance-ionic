import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PopoverPage } from "./pop-over";
import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
@NgModule({
  declarations: [],
  imports: [IonicPageModule.forChild(PopoverPage)]
})
export class PopOverPageModule {}
