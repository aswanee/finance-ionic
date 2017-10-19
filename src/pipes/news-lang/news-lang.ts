import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NewsLangPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'newsLang', pure: false
})
export class NewsLangPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
        return items;
    }
    switch(filter)
    {
      case "ArabicNews":
        return items.filter(item => item[5] == "true");
      case "EnglishNews":
        return items.filter(item => item[5] == "false");
      default:
        return items
    }
  }
}
