import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';

/**
 * Generated class for the AssessmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assessments',
  templateUrl: 'assessments.html',
})
export class AssessmentsPage {

  assessments: Observable<Assessment[]>
  assessmentsRef: AngularFireList<Assessment>
  assessmentsChangeFeed: Observable<AngularFireAction<DatabaseSnapshot<Assessment>>[]>
  
  columns = [
    { name: 'Date', prop: 'createDate' },
    { name: 'Emogi' },
  ];

  rows = [{
    emogi: '🔰',
    createDate: new Date().toString()
  }]

  kid: Kid

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.kid = this.navParams.get('kid')

    this.assessmentsRef = this.database.list('assessments', ref => ref.orderByChild('kidId').equalTo(this.kid.$key))
    this.assessmentsChangeFeed = this.assessmentsRef.snapshotChanges()

    this.assessments = this.assessmentsChangeFeed.pipe(
      map(snapshots => snapshots.map((action: any) => {
        return {
          ...action.payload.val(),
          $key: action.payload.key,
        };
      }))
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssessmentsPage');
  }

  addAssessment() {
    this.assessmentsRef.push({
      createDate: new Date().toString(),
      emogi: '👍',
      kidId: this.kid.$key
    } as Assessment);
  }

  delete ($key) {
    console.log($key)
    this.assessmentsRef.remove($key);
  }

}
