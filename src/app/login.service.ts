import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { token } from "./token.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { ParentService } from "./parentservice.service";
@Injectable()
export class LoginService extends ParentService {

  //Rashed Need to search
  gettoken(UserName: string, Password: string): Observable<token> {
    this.getunsecurelink();
    this.link = this.link + "apis/account/token";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    console.log(headers);
    console.log(headers.values());

    let body = "auth={UserName:'" + UserName + "',Password:'" + Password + "'}";
    console.log(body);
    let response = this.http
      .post(this.link, body, {
        headers: headers
      })
      .map(x => {
        console.log(x);
        return <token>x.json();
      })
      .catch((t: Response) => t.json());
    //  console.log(response);
    return response;
  }
}
