import { Component, OnInit, Input } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import { ParentService } from "../../app/parentservice.service";

// import { ChartModule } from "angular2-highcharts";

/**
 * Generated class for the ChartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-chart",
  templateUrl: "chart.html"
})
export class ChartPage extends ParentService{
  link: string = "";
  d = [];
  received_json;
  @Input() isIntraDays: boolean;
  @Input() rouiterCode: string = "";
  @Input() ChartType: string = "";
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) 
  {
    super(http);
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetSimpleChartWithinRange?Codes=";
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChartPage");
  }

  options: Object;
  ngOnInit() {
    this.getchart(this.isIntraDays).subscribe(data => {
      this.received_json = data;
      var l = this.received_json.result.V.length;
      for (var index = 0; index < l; index++) {
        this.d.push([
          new Date(this.received_json.result.V[l - index - 1][0]).getTime(),
          Number(this.received_json.result.V[l - index - 1][2])
        ]);
      }
      this.options = {
      // title: { text: this.rouiterCode.toUpperCase() + " Stock Price" },
      //   rangeSelector: {
      //     buttons: [{
      //         type: 'hour',
      //         count: 1,
      //         text: '1h'
      //     }, {
      //         type: 'day',e

      //         count: 1,
      //         text: '1D'
      //     }, {
      //         type: 'all',
      //         count: 1,
      //         text: 'All'
      //     }],
      //     selected: 1,
      //     inputEnabled: false
      // },        
      colors: ['orange', '#F3B32A', '#F3B32A', '#F3B32A', '#F3B32A', '#F3B32A', 
      '#F3B32A', '#F3B32A', '#F3B32A'],
      chart: {
        backgroundColor: '#242424'
      },
      series: [
          {
            //type: 'candlestick',
            name: this.rouiterCode,
            data: this.d,
            tooltip: {
              valueDecimals: 2
            }
          }
        ]
      };
    });
  }

  getchart(isIntra: boolean): Observable<any> {
    var date2 = new Date();
    var date = new Date();
    this.link += this.rouiterCode;
    this.link += "&from=";
    if (isIntra) {
      date2.setDate(date.getDay() - 5);
      this.link += date2.toISOString().substring(0, 10);
      this.link += "&to=";
      this.link += date.toISOString();
      this.link += "&isIntra=1";
    } else {
      date2.setFullYear(date.getFullYear() - 1);
      this.link += date2.toISOString().substring(0, 10);
      this.link += "&to=";
      this.link += date.toISOString();
      this.link += "&isIntra=0";
    }
    return this.http
      .get(this.link)
      .map(x => {
        return <any>x.json();
      })
      .catch((t: Response) => t.json());
  }
}
