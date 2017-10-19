import { NgModule } from "@angular/core";
import { LimitToPipe } from "./../pipes/limit-to/limit-to";
import { aroundToPipe } from "./../pipes/around-to/around-to";
import { LanguagePipe } from "./Language/Language.pipe";
import { NewsLangPipe } from './news-lang/news-lang';
@NgModule({
  declarations: [LimitToPipe, aroundToPipe, LanguagePipe,
    NewsLangPipe],
  imports: [],
  exports: [LimitToPipe, aroundToPipe, LanguagePipe,
    NewsLangPipe]
})
export class PipesModule {}
