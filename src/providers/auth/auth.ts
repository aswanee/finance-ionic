import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { ParentService } from "../../app/parentservice.service";
import { Observable } from "rxjs/Observable";
import { session ,User} from "../../app/session.interface";
import { Storage } from "@ionic/storage";

@Injectable()
export class AuthProvider extends ParentService {

  CurrentSession: session;
  
  constructor(public http: Http, private storage: Storage) {
    super(http)
    console.log('Hello AuthProvider Provider');
  }

  public login(credentials :User):Observable<session> {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!

        this.getsecurelink();
        this.link = this.link + "apis/account/token";
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        let body = "auth={UserName:'" + credentials.username + "',Password:'" + credentials.password + "'}";

        let response = this.http
        .post(this.link, body, {
          headers: headers
        })
        .map(x => {
          let Session = <session>(x.json());
          if(!Session ||Session.result.UserID<=0)
          {
            console.log(Session);
            throw("Response With Not Session data");
          }
          else
          {
            this.CurrentSession = Session;
            this.CurrentSession;
            this.storage.set("token", this.CurrentSession);
            
            observer.next(true)
          }
        })
        .subscribe(
          data =>{
            console.log(data)
          },
          err=>{
            console.log(err.json())
            observer.next(false);
          },
          ()=>{
            console.log("COMPLET :)")
            observer.complete();
          }
        )
        

        // //this.currentUser = new User('Simon', 'saimon@devdactic.com');
        // observer.next(access);
        // observer.complete();
      });
    }
  }

  public getUserInfo() : session {
    return this.CurrentSession;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.CurrentSession = null;
      observer.next(true);
      observer.complete();
    });
  }
}
