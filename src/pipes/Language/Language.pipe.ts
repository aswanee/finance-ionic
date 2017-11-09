import { Pipe, PipeTransform } from "@angular/core";
import { ArabicDictionary, EnglishDictionary } from "./../../app/dictionary";
// import { language } from "./../../app/app.module";
//import { Storage } from "@ionic/storage";

@Pipe({ name: "Language", pure: false })
export class LanguagePipe implements PipeTransform {
  constructor() {}
  transform(value: string, ...args): string {
    var lang:string= value
    if (window["language"] === "ar")
    {
      lang = ArabicDictionary[value];
    }
    else
    {
      lang = EnglishDictionary[value];
    }
    return lang;
  }
}
