import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data.provider';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  color: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {
    this.color = this.dataProvider.activeKid.colour;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
