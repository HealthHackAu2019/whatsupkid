import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data.provider';
import { LocationData } from '../../models/assessment.interface';
import { AlertProvider } from '../../providers/alert/alert';
import { ToastProvider } from '../../providers/toast/toast';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  locations: any;
  frontParts: any;
  backParts: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private alertProvider: AlertProvider, private toastProvider: ToastProvider) {
    this.locations = this.dataProvider.locationData;
    this.frontParts = [
      this.dataProvider.locationData[0],
      this.dataProvider.locationData[1],
      this.dataProvider.locationData[2],
    ];
    this.backParts = [
      this.dataProvider.locationData[3],
      this.dataProvider.locationData[4],
      this.dataProvider.locationData[5],
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    console.table(this.locations);
  }

  next(locationData: LocationData) {
    console.info('locationData', locationData)
    try {
      this.dataProvider.activeAssessment.$ref.update({location: locationData.location});
      this.toastProvider.showToast('Thank you for your feedback!')
      this.navCtrl.push('HomePage');
    } catch (error) {
      this.alertProvider.showBasicAlert('Error', error.message);
      console.error(error);
    }
  }

}
