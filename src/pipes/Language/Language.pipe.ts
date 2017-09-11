import { Pipe, PipeTransform } from "@angular/core";
import { ArabicDictionary, EnglishDictionary } from "./../../app/dictionary";
// import { language } from "./../../app/app.module";

@Pipe({ name: "Language", pure: false })
export class LanguagePipe implements PipeTransform {
  transform(value: string, ...args): string {
    if (window["language"] === "ar") {
      // console.log(ArabicDictionary[value]);
      return ArabicDictionary[value];
    } else if (window["language"] === "en") {
      // console.log(EnglishDictionary[value]);
      return EnglishDictionary[value];
    }
  }
}
