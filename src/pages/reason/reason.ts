import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data.provider';
import { ToastProvider } from '../../providers/toast/toast';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { ReasonData } from '../../models/assessment.interface';

/**
 * Generated class for the ReasonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reason',
  templateUrl: 'reason.html'
})
export class ReasonPage {
  reasons: any;
  color: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
    private toastProvider: ToastProvider,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
  ) {
    this.reasons = this.dataProvider.reasonData;
    this.color = this.dataProvider.activeKid.colour;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReasonPage');
  }

  logout() {
    console.log('App Component Logged out...');
    this.authProvider.logout();
    this.toastProvider.showToast(`Bye.`);
    this.navCtrl.setRoot('WelcomePage');
  }

  next(reasonData: ReasonData) {
    console.info('moodData', reasonData)
    try {
      this.dataProvider.activeAssessment.$ref.update({mood: reasonData.reason});
      this.navCtrl.push('LocationPage');
    } catch (error) {
      this.alertProvider.showBasicAlert('Error', error.message);
      console.error(error);
    }
  }


}
