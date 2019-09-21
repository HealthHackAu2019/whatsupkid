import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data.provider';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private alertProvider: AlertProvider, private toastProvider: ToastProvider, private dataProvider: DataProvider) {
    // TODO set kid logged in to active kid
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logout() {
        console.log('App Component Logged out...');
        this.authProvider.logout();
        this.toastProvider.showToast(`You have been logged out. Come back soon.`)
        this.navCtrl.setRoot('WelcomePage');
  }

  startAssessment () {
    this.dataProvider.addAssessment()
    // TODO: navigate to the assessment screen
  }

  isAnonymous(): boolean {
    return this.authProvider.isCurrentUserAnonymous();
  }
}
