import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";
//import { session ,User} from "../app/session.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { Favorites,AddFavorites } from "./newsbody.interface";
import { ParentService } from "./parentservice.service";
import { Subject } from 'rxjs/Subject';


@Injectable()
export class FavoritesService extends ParentService {

  link:string ="";
  //Rashed Need to searchfavorite.service
  FavoriteNews : Favorites;
  FavoriteNews2 : string [];

  // getUserFavorites(id: number): Observable<Favorites> {
  //   this.getsecurelink();
  //   this.link = this.link + "apis/account/getUserFavorites?UserID=" + id + "&TypeID=1";
  //   return this.http
  //     .get(this.link)
  //     .map(x => {
  //       this.FavoriteNews = (<Favorites>x.json());
  //       return this.FavoriteNews;
  //       //return this.FavoriteNews
  //     })
  //     .catch((t: Response) => t.json());
  // }


  OldFavoriteNewsID:string ="0";
  




  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  private subject = new Subject<any>();


GetFavoriteNews(userid : string): Observable<any> {
    // if(this.FavoriteNews.result.V.length>0)
    //   return ;
    this.subject.next({ FavoriteNews: this.FavoriteNews2 });

    this.getunsecurelink();
    this.link += "apis/market/GetFavoriteNews?userid=" + userid + "&id=" + this.OldFavoriteNewsID ;
    return this.http
      .get(this.link)
      .map(x => {
         this.FavoriteNews = <Favorites>x.json();
         if(this.FavoriteNews.result.V.length>0)
         {
             this.FavoriteNews2 = this.FavoriteNews.result.V;
             this.OldFavoriteNewsID = this.FavoriteNews.result.N ; 
         }
         
         this.subject.next({ FavoriteNews: this.FavoriteNews2 });
         return this.FavoriteNews2;
         
      })
      .catch((t: Response) => t.json());
  }
  

  getCurrentFavorat()
  {
    return this.FavoriteNews; 
  }
RemoveFavorite_test(NewsID : string)
{
  var i = 0;
  var len : number= this.FavoriteNews2.length
  for(i=0; i<len ; i++)
  {
    if(this.FavoriteNews2[i][0]==NewsID)
    {
      this.FavoriteNews2[i] = this.FavoriteNews2[len -1];
      this.FavoriteNews2.pop();
      break;
    }
    console.log(this.FavoriteNews2[i]);
  }
}
  RemoveFavorite(id: string,uid:string, FavID : string): any {
    this.getsecurelink();
    this.link = this.link + "apis/account/RemoveFavorite?ItemID=";
    //int ItemID, int userID
    this.link = this.link + id;
    this.link = this.link + "&userID=" + uid;
    this.link = this.link + "&favid=" + FavID;
    
    return this.http
      .get(this.link)
      .map(x => {
        var i = 0;
        var len : number= this.FavoriteNews2.length
        for(i=0; i<len ; i++)
        {
          if(this.FavoriteNews2[i][0]==id)
          {
            this.FavoriteNews2[i] = this.FavoriteNews2[len -1];
            this.FavoriteNews2.pop();
            break;
          }
          console.log(this.FavoriteNews2[i]);
        }
        return <Favorites>x.json();
      })
      .catch((t: Response) => t.json());
  }

  AddFavorite(
    UserID: string,
    ItemID: string
): any {
    //AddFavorite(id , typeID , ItemID , User_Id , PinDate )
    this.getsecurelink();
    this.link = this.link + "apis/account/AddFavorite";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let sent: string = "Favorite={ id:0, typeID:1 , ItemID:'" + ItemID + "', User_Id:" + 
    UserID + ", PinDate: '1900-01-01'}";

    return this.http
      .post(this.link, sent, { headers: headers })
      .map(x => {
       var FavItem :any = <AddFavorites>x.json().result;
        this.FavoriteNews2.push(FavItem.Detail);
        return FavItem;
      })
      .catch((t: Response) => t.json());
  }

}
