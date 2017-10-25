import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: "hideButton", pure: false })

export class HideButtonPipe implements PipeTransform {
  transform(items: [{BName: string, IconName: string, visable: boolean}]): any {
    if (!items) {
        return items;
    }
    var fItems = items.filter(item => item.visable);
    console.log(fItems);
    return fItems;
  }
}
