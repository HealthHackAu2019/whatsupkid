import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { DataProvider } from '../../providers/data/data.provider';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private alertProvider: AlertProvider, private dataProvider: DataProvider, private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  goToLogin() {
    this.navCtrl.push('LoginPage')
  }
  goToSignUp() {
    this.navCtrl.push('SignUpPage')
  }

  loginAnon() {
    this.authProvider.loginAnonymously()
      .then(() => {
        //TODO :: show confirm 
        // this.alert.basicAlert('Sign up to keep data', 'This account only lasts for 30 Days...prevent this by signing up', Sign up');
        this.navCtrl.setRoot('TabsPage');
      })
      .catch((error) => {
        this.alertProvider.showBasicAlert('Error', error.message);
        console.log('LoginPage:err', error);
      })
  }

  // Should only fire if there is no currently logged in user
  async chooseColourAndRegisterKidAndStartAssessment (colour: any) {

    this.dataProvider.loading = this.loadingController.create({
      content: "Just a tic... 😊⏳",
    })
    
    await this.dataProvider.loading.present();

    // Register kid as a user
    const result = await this.authProvider.loginAnonymously()

    // Create kid object to store the kid's deets
    const kid = await this.dataProvider.addKid(result.user.uid, colour)

    // Set kid record as the one currently logged in
    this.dataProvider.activateKid(kid)

    // Create assessment
    this.dataProvider.loadAssessments()
    const assessment = await this.dataProvider.addAssessment()
    this.dataProvider.activateAssessment(assessment)

    // The auth handler will decide our fate now
  }
}
