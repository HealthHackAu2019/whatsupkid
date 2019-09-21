import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './firebaseConfig';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AuthProvider } from '../providers/auth/auth';
import { AlertProvider } from '../providers/alert/alert';
import { ToastProvider } from '../providers/toast/toast';
import { AssessmentsPage } from '../pages/assessments/assessments';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataProvider } from '../providers/data/data.provider';

@NgModule({
  declarations: [
    MyApp,
    AssessmentsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    NgxDatatableModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AssessmentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthProvider,
    AlertProvider,
    ToastProvider,
    DataProvider
  ]
})
export class AppModule {}
