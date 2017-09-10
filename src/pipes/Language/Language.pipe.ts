import { Pipe, PipeTransform } from "@angular/core";
import { ArabicDictionary, EnglishDictionary } from "./../../app/dictionary";
import { language } from "./../../pages/settings/settings";
@Pipe({ name: "Language" })
export class LanguagePipe implements PipeTransform {
  transform(value: string): string {
    if (language === "ar") {
      return ArabicDictionary[value];
    } else if (language === "en") {
      return EnglishDictionary[value];
    }
  }
}
