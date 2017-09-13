import { Pipe, PipeTransform } from "@angular/core";
import { ArabicDictionary, EnglishDictionary } from "./../../app/dictionary";
// import { language } from "./../../app/app.module";
import { Storage } from "@ionic/storage";
// import { languageinit } from "./../../pages/WatchList/WatchList";
@Pipe({ name: "Language", pure: false })
export class LanguagePipe implements PipeTransform {
  constructor(private storage: Storage) {}
  transform(value: string, ...args): string {
    // this.storage.get("language").then(val => {
    //   window["language"] = val;
    //   console.log("read from store in pipe");
    // });
    if (window["language"] === "ar") {
      // console.log(ArabicDictionary[value]);
      console.log("aabic");
      return ArabicDictionary[value];
    } else if (window["language"] === "en") {
      // console.log(EnglishDictionary[value]);
      console.log("english");
      return EnglishDictionary[value];
    }
    // else {
    //   if (!languageinit) {
    //     let langinit: boolean = true;
    //     window["language"] = "en";
    //     this.storage.set("language", "en");
    //     window["isArabic"] = false;
    //     this.storage.set("isArabic", false);
    //     this.storage.set("languageinit", langinit);
    //     console.log("set");
    //     return EnglishDictionary[value];
    //   }
    // }
  }
}
