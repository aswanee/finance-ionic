import { Pipe, PipeTransform } from "@angular/core";
import { ArabicDictionary, EnglishDictionary } from "./../../app/dictionary";
// import { language } from "./../../app/app.module";
import { Storage } from "@ionic/storage";

@Pipe({ name: "Language", pure: false })
export class LanguagePipe implements PipeTransform {
  constructor(private storage: Storage) {}
  transform(value: string, ...args): string {
    if (window["language"] === "ar") {
      return ArabicDictionary[value];
    } else if (window["language"] === "en") {
      return EnglishDictionary[value];
    }
  }
}
