import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssessmentsPage } from '../assessments/assessments';
import { DataProvider } from '../../providers/data/data.provider';
import { Kid } from '../../models/kid.interface';
import { DashboardPage } from '../dashboard/dashboard';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
    dataProvider.loadKids()
  }

  async navigateToAssessments(kid: Kid) {
    this.dataProvider.activateKid(kid)
    this.dataProvider.loadAssessments()
    this.navCtrl.push(AssessmentsPage, {kid})
  }

  async navigateToDashboard(kid: Kid) {
    this.dataProvider.activateKid(kid)
    this.dataProvider.loadAssessments()
    this.navCtrl.push(DashboardPage, {kid})
  }
}
