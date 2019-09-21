import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';
import {Assessment} from '../../models/assesment.interface'
import { Kid } from '../../models/kid.interface';

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
    { name: 'Date', prop: 'createDate'},
    { name: 'Mood' },
    { name: 'Pain Areas' },
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
          $ref: action.payload.ref,
          $key: action.payload.key,
          ...action.payload.val(),
        };
      }))
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssessmentsPage');
  }

  add() {
    this.assessmentsRef.push({
      createDate: new Date().toString(),
      mood: '👍',
      painAreas: [],
      kidId: this.kid.$key
    });
  }

  update (row, key, value) {
    row.$ref.update({[key]: value})
  }
}
