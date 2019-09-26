import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastProvider } from '../../providers/toast/toast';
import { AlertProvider } from '../../providers/alert/alert';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private alertProvider: AlertProvider, private toastProvider: ToastProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  


  async login(user: User) {
    const result = await this.authProvider.login(user)
    try {
      if (result) {
        this.navCtrl.push('TabsPage');
        this.toastProvider.showToast("Welcome Back");
      }
    } catch (error) {
      this.alertProvider.showBasicAlert('Error', error.message);
      console.error(error)
    }
  }
  
  goToSignup() {
    this.navCtrl.push('SignUpPage')
  }

}
