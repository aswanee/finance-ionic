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
  // login() {
  //   console.log("lohgin");
  //   // let body = JSON.stringify({});
  //   let headers = new Headers({
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   });
  //   // headers.append("Content-Type", "application/json");
  //   headers.append("username", "wesimy");
  //   headers.append("password", "Otv@1234");
  //   // headers.append("access-control-allow-credentials", "true");
  //   return new Promise(resolve => {
  //     this.http
  //       .post("apis/market/token", {
  //         headers: JSON.stringify(headers)
  //       })
  //       .map(response => response.json())
  //       .subscribe(
  //         response => {
  //           console.log(response);
  //           if (response) {
  //             resolve(response);
  //           } else {
  //             resolve(false);
  //           }
  //         },
  //         error => {
  //           resolve(false);
  //         }
  //       );
  //   });
  // }

  //Rashed Need to search
  gettoken(UserName: string, Password: string): Observable<token> {
    this.getunsecurelink();
    this.link = this.link + "apis/account/token";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    console.log(headers);
    console.log(headers.values());
    // let options = new RequestOptions({ headers: headers });
    // console.log(options);
    // console.log(options.headers.get("username"));
    // console.log(options.headers.get("password"));
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
