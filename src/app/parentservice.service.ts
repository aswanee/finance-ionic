import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
@Injectable()
export class ParentService {
  constructor(protected http: Http) {}
  link: string;
  debug: boolean = false;
  getlink() {
    if (this.debug === true) {
      this.link = "http://staging5.arabfinance.com/apis/market/";
    } else {
      this.link = "https://www.arabfinance.com/apis/market/";
    }
  }
}
