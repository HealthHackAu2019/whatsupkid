import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data.provider';
// import { SpiritEmojiPage } from '../spirit-emoji/spirit-emoji';
// import { Kid } from '../../models/kid.interface';

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
  name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private alertProvider: AlertProvider, private toastProvider: ToastProvider, private dataProvider: DataProvider) {
    // TODO set kid logged in to active kid
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }



  logout() {
        console.log('App Component Logged out...');
        this.authProvider.logout();
        this.toastProvider.showToast(`Bye.`)
        this.navCtrl.setRoot('WelcomePage');
  }

  // async startAssessment () {
  //   const assessment = await this.dataProvider.addAssessment()
  //   this.dataProvider.activateAssessment(assessment)
  //   this.navCtrl.push(SpiritEmojiPage, {assessment})
  // }

  isAnonymous(): boolean {
    return this.authProvider.isCurrentUserAnonymous();
  }
}
