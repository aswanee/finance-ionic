import { Component, OnInit, Input } from '@angular/core';
import { Http }  from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

/**
 * Generated class for the ChartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {
  link = '';
  d = [];
  received_json;
  @Input()
  rouiterCode : string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.link = 'https://www.arabfinance.com/apis/market/GetSimpleChartWithinRange?Codes=';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
  }
  
  options: Object; ngOnInit() {

        this.getchart(new Date()).subscribe(data  => {this.received_json = data;
            var l = this.received_json.result.V.length;
            for (var index = 0; index < l; index++) {
              this.d.push([new Date(this.received_json.result.V[l-index-1][0]).getTime(), Number(this.received_json.result.V[l-index-1][2])])
            };
              this.options = {
                        title : { text : this.rouiterCode.toUpperCase() + ' Stock Price' },   
                        series : [{
                            name : this.rouiterCode, 
                            data : this.d, 
                            tooltip: {
                                valueDecimals: 2 
                            }
                        }]
               };
          });
    
    }
      getchart(date: Date): Observable<any> {
      var date2 = new Date;
      this.link += this.rouiterCode;
      this.link += '&from=';
      date2.setFullYear(date.getFullYear()-1);
      this.link += date2.toISOString().substring(0,10);
      this.link += '&to=';
      this.link += date.toISOString().substring(0,10);
      this.link += '&isIntra=0';
        return this.http
        .get(this.link)
        .map( x => {
        return  <any>x.json();
      }).catch((t: Response) => t.json());
    }
}
