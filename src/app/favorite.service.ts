import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { session ,User} from "../app/session.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { Favorites } from "./newsbody.interface";
import { ParentService } from "./parentservice.service";


@Injectable()
export class FavoritesService extends ParentService {

  link:string ="";
  //Rashed Need to searchfavorite.service
  getUserFavorites(id: number): Observable<Favorites> {
    this.getsecurelink();
    this.link = this.link + "apis/account/getUserFavorites?UserID=";
    this.link = this.link + id + "&TypeID=1";
    return this.http
      .get(this.link)
      .map(x => {
        return <Favorites>x.json();
      })
      .catch((t: Response) => t.json());
  }

  RemoveFavorite(id: string,uid:string): Observable<Favorites> {
    this.getsecurelink();
    this.link = this.link + "apis/account/RemoveFavorite?ItemID=";
    //int ItemID, int userID
    this.link = this.link + id;
    this.link = this.link + "&userID=" + uid;
    return this.http
      .get(this.link)
      .map(x => {
        return <Favorites>x.json();
      })
      .catch((t: Response) => t.json());
  }

  AddFavorite(
    UserID: string,
    ItemID: string
): Observable<Favorites> {
    //AddFavorite(id , typeID , ItemID , User_Id , PinDate )
    this.getsecurelink();
    this.link = this.link + "apis/account/AddFavorite";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let sent: string = "Favorite={ id:0, typeID:1 , ItemID:" + ItemID + ", User_Id:" + 
    UserID + ", PinDate: '1900-01-01'}";

    return this.http
      .post(this.link, sent, { headers: headers })
      .map(x => {
        return <Favorites>x.json();
      })
      .catch((t: Response) => t.json());
  }

}
