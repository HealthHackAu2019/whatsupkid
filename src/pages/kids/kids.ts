import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';
import { AssessmentsPage } from '../assessments/assessments';
import { Kid } from '../../models/kid.interface';

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
  kidsRef: AngularFireList<Kid>
  kidsChangeFeed: Observable<AngularFireAction<DatabaseSnapshot<Kid>>[]>

  columns = [
    { name: 'Date', prop: 'createDate', editable: false},
    { name: 'Name', editable: true },
    { name: 'Spirit Emoji', editable: true },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.kidsRef = this.database.list('kids')

    this.kidsChangeFeed = this.kidsRef.snapshotChanges()
    
    this.kids = this.kidsChangeFeed.pipe(
      map(snapshots => snapshots.map((action: any): Kid => {
        return {
          $ref: action.payload.ref,
          $key: action.payload.key,
          ...action.payload.val(),
        }
      }))
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KidsPage');
  }

  add () {
    this.kidsRef.push({
      createDate: new Date().toString(),
      name: "Unnamed",
      spiritEmoji: '🐱‍👤'
    })
  }

  update (kid, key, value) {
    kid.$ref.update({[key]: value})
  }

  async navigateToAssessments(kid) {
    this.navCtrl.push(AssessmentsPage, {kid})
  }
}
