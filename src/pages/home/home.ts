import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data.provider';
import { MoodData, Mood } from '../../models/assessment.interface';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  name: any;
  moods: any;
  color: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private alertProvider: AlertProvider, private toastProvider: ToastProvider, private dataProvider: DataProvider) {
    // TODO set kid logged in to active kid
    this.moods = this.dataProvider.moodsData
    this.color = this.dataProvider.activeKid.colour;
    
    if(this.dataProvider.loading) {
      this.dataProvider.loading.dismiss()
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    console.table(this.moods);
  }

  logout() {
        console.log('App Component Logged out...');
        this.authProvider.logout();
        this.toastProvider.showToast(`Bye.`)
        this.navCtrl.setRoot('WelcomePage');
  }

  isAnonymous(): boolean {
    return this.authProvider.isCurrentUserAnonymous();
  }

  next(moodData: MoodData) {
    console.info('moodData', moodData)
    try {
      if (moodData.mood === Mood.HAPPY) {
        this.toastProvider.showToast('Thanks for your feedback!');
      } else {
        this.dataProvider.update(this.dataProvider.activeAssessment, 'mood',  moodData.mood);
        this.dataProvider.activeKid.$ref.update({name: this.dataProvider.activeKid.name});
        this.navCtrl.push('ReasonPage');
      }
    } catch (error) {
      this.alertProvider.showBasicAlert('Error', error.message);
      console.error(error);
    }
  }
}
