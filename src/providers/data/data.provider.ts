import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';
import { Kid } from '../../models/kid.interface';
import { Assessment } from '../../models/assesment.interface';


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  kids: Observable<Kid[]>
  kidsRef: AngularFireList<Kid>
  kidsChangeFeed: Observable<AngularFireAction<DatabaseSnapshot<Kid>>[]>

  /** The kid used to resolve the list of assessments. Will be the logged in Kid for a Kid-login, or the selected Kid for a Clinician */
  activeKid: Kid

  assessments: Observable<Assessment[]>
  assessmentsRef: AngularFireList<Assessment>
  assessmentsChangeFeed: Observable<AngularFireAction<DatabaseSnapshot<Assessment>>[]>

  activeAssessment: Assessment
  
  constructor(private database: AngularFireDatabase) {
  }

  update (entity: any, key: string, value: any) {
    entity.$ref.update({[key]: value})
  }

  /*🐱‍👤 Kid stuff */

  loadKids () {
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

  activateKid (kid: Kid) {
    this.activeKid = kid
  }

  addKid () {
    this.kidsRef.push({
      createDate: new Date().toString(),
      name: "Unnamed",
      spiritEmoji: '🐱‍👤'
    })
  }

  /*💠 Assessment Stuff */

  loadAssessments () {
    // this.assessmentsRef = this.database.list('assessments')
    this.assessmentsRef = this.database.list('assessments', ref => ref.orderByChild('kidId').equalTo(this.activeKid.$key))

    this.assessmentsChangeFeed = this.assessmentsRef.snapshotChanges()
    
    this.assessments = this.assessmentsChangeFeed.pipe(
      map(snapshots => snapshots.map((action: any): Assessment => {
        return {
          $ref: action.payload.ref,
          $key: action.payload.key,
          ...action.payload.val(),
        }
      }))
    );
  }

  activateAssessment (assessment: Assessment) {
    this.activeAssessment = assessment
  }

  async addAssessment () {
    const assessment: Assessment = {
      createDate: new Date().toString(),
      kidId: this.activeKid.$key,
      mood: 'meh',
      painAreas: []
    }

    const ref = await this.assessmentsRef.push(assessment)
    
    return {
      ...assessment,
      $ref: ref,
      $key: ref.key
    }
  }
}
