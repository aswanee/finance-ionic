import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { StockService } from "./../../app/stock.service";

/**
 * Generated class for the AlertPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-alert",
  templateUrl: "alert.html"
})
export class AlertPage {
  private alertForm: FormGroup;
  dispnames: any[][] = new Array();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private StockService: StockService
  ) {
    this.alertForm = this.formBuilder.group({
      reuter: ["", Validators.required],
      feild: ["", Validators.required],
      criteria: ["", Validators.required],
      value: ["", Validators.required],
      note: [""]
    });
  }

  ngOnInit() {
    this.StockService.getnames(true).subscribe(data => {
      console.log(data.result);
      this.dispnames = data.result;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AlertPage");
  }

  addAlert() {
    console.log(this.alertForm.value);
  }
}
