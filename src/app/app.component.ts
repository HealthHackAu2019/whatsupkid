import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastProvider } from '../providers/toast/toast';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth) {
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
      .subscribe((user) => {
        if (user) {
          this.rootPage = 'TabsPage'
          console.info("user", user);
        } else {
          this.rootPage = 'WelcomePage'
          console.info("user", user);
        }
      });
  }
}
