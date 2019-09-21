// import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
// import { KidsPage } from '../kids/kids';
// import { IonicPage } from 'ionic-angular';

// @IonicPage(
//   {name: 'tabs-page'}
// )
// @Component({
//   templateUrl: 'tabs.html'
// })
// export class TabsPage {

//   tab1Root = HomePage;
//   tab2Root = AboutPage;
//   tab3Root = ContactPage;
//   tab4Root = KidsPage;

//   constructor() {

//   }
// }
// //
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  
  tab1Root = 'HomePage';
  tab2Root = 'AboutPage';
  tab3Root = 'ContactPage';
  tab4Root = 'KidsPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
