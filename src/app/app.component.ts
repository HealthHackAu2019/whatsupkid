import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastProvider } from '../providers/toast/toast';
import { DataProvider } from '../providers/data/data.provider';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth, private dataProvider: DataProvider, private authProvider: AuthProvider) {
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
          console.info("user", user);

          // If user is anon it means they're a kid
          if (this.authProvider.isCurrentUserAnonymous()) {
            const kid = await this.dataProvider.getKid(user.uid)
            this.dataProvider.activateKid(kid)

            if (!kid) {
              throw new Error('There is no kid record associated with this user')
            }
            
            this.dataProvider.loadAssessments()
            
            const assessment = await this.dataProvider.addAssessment()
            this.dataProvider.activateAssessment(assessment)
            
            console.info("kid", kid);
            console.info("assessment", assessment);
          }

          this.rootPage = 'TabsPage';
        } else {
          this.rootPage = 'WelcomePage'
        }
    })
  }
}
