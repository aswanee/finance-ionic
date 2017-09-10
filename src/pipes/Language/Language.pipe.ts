import { Pipe, PipeTransform } from "@angular/core";
import { ArabicDictionary, EnglishDictionary } from "./../../app/dictionary";
import { language } from "./../../pages/settings/settings";
@Pipe({ name: "Language", pure: false })
export class LanguagePipe implements PipeTransform {
  transform(value: string, ...args): string {
    if (language === "ar") {
      console.log(ArabicDictionary[value]);
      return ArabicDictionary[value];
    } else if (language === "en") {
      console.log(EnglishDictionary[value]);
      return EnglishDictionary[value];
    }
  }
}
