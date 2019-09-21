import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';
import { AssessmentsPage } from '../assessments/assessments';

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
    { name: 'Name' },
    { name: 'Emogi' },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.kidsRef = this.database.list('kids')

    this.kidsChangeFeed = this.kidsRef.snapshotChanges()
    
    this.kids = this.kidsChangeFeed.pipe(
      map(snapshots => snapshots.map((action: any) => {
        return {
          ...action.payload.val(),
          $key: action.payload.key,
        };
      }))
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KidsPage');
  }

  addKid () {
    this.kidsRef.push({
      createDate: new Date().toString(),
      name: "Unnamed",
      emogi: '👍'
    } as Kid);
  }

  async navigateToAssessments($key) {
    const kids = await new Promise(resolve => this.kids.subscribe(kids => resolve(kids))) as Kid[]
    const kid = kids.find(kid => kid.$key === $key)
    this.navCtrl.push(AssessmentsPage, {kid})
  }

  delete ($key) {
    console.log($key)
    this.kidsRef.remove($key);
  }
}
