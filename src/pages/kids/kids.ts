import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssessmentsPage } from '../assessments/assessments';
import { KidProvider } from '../../providers/kid/kid';

/**
 * Generated class for the KidsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kids',
  templateUrl: 'kids.html',
})
export class KidsPage {

  columns = [
    { name: 'Date', prop: 'createDate', editable: false},
    { name: 'Name', editable: true },
    { name: 'Spirit Emoji', editable: true },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public kidProvider: KidProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KidsPage');
  }

  async navigateToAssessments(kid) {
    this.navCtrl.push(AssessmentsPage, {kid})
  }
}
