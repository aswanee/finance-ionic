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
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  //Rashed Need to search
  getmarketsummary(UserName: string, Password: string): Observable<token> {
    this.debug = true;
    this.getlink();
    let headers = new Headers();
    headers.append("username", UserName);
    headers.append("password", Password);
    console.log(headers);
    console.log(headers.values());
    // let options = new RequestOptions({ headers: headers });
    // console.log(options);
    // console.log(options.headers.get("username"));
    // console.log(options.headers.get("password"));
    let response = this.http
      .post(this.link + "token", null, {
        headers: headers
      })
      .map(x => {
        console.log(x);
        return <token>x.json();
      })
      .catch((t: Response) => t.json());
    //  console.log(response);
    this.debug = false;
    return response;
  }
}
