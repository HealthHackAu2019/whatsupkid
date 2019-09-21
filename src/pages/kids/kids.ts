import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs-compat';

/**
 * Generated class for the KidsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kids',
  templateUrl: 'kids.html',
})
export class KidsPage {

  kids: Observable<Kid[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.kids = this.database.list('kids').valueChanges() as Observable<Kid[]>
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KidsPage');
  }

}
