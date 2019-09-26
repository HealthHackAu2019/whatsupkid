import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data.provider';

/**
 * Generated class for the AssessmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assessments',
  templateUrl: 'assessments.html',
})
export class AssessmentsPage {
  columns = [
    { name: 'Date', prop: 'createDate'},
    { name: 'Mood' },
    { name: 'Reason' },
    { name: 'Location' },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {
  }

  getMoodLabel(value) {
    return this.dataProvider.moodsData.find(moodData => moodData.mood === value).label
  }

  getLocationLabel(value) {
    return this.dataProvider.locationData.find(locationData => locationData.location === value).label
  }

  getReasonLabel(value) {
    return this.dataProvider.reasonData.find(reasonData => reasonData.reason === value).label
  }
}
