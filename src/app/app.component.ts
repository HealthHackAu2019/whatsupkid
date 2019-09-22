import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastProvider } from '../providers/toast/toast';
import { DataProvider } from '../providers/data/data.provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth, private dataProvider: DataProvider) {
    this.handleAuthState();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  handleAuthState() {
    this.afAuth.authState
      .subscribe(async (user) => {
        if (user) {
          this.rootPage = 'TabsPage'

          const kid = await this.dataProvider.getKid(user.uid)
          this.dataProvider.activateKid(kid)

          this.dataProvider.loadAssessments()

          const assessment = await this.dataProvider.addAssessment()
          this.dataProvider.activateAssessment(assessment)

          console.info("user", user);
          console.info("kid", kid);
        } else {
          this.rootPage = 'WelcomePage'
        }
      });
  }
}
