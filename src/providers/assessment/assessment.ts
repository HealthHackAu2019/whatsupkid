import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';
import { Kid } from '../../models/kid.interface';
import { Assessment } from '../../models/assesment.interface';


/*
  Generated class for the AssessmentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AssessmentProvider {
  assessments: Observable<Assessment[]>
  assessmentsRef: AngularFireList<Assessment>
  assessmentsChangeFeed: Observable<AngularFireAction<DatabaseSnapshot<Assessment>>[]>

  kid: Kid

  constructor(kid:Kid, private database: AngularFireDatabase) {
    this.kid = kid

    this.assessmentsRef = this.database.list('assessments')

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

  add () {
    const assessment: Assessment = {
      createDate: new Date().toString(),
      kidId: this.kid.$key,
      mood: 'meh',
      painAreas: []
    }

    this.assessmentsRef.push(assessment)
  }

  update (assessment, key, value) {
    assessment.$ref.update({[key]: value})
  }
}

/* Knowing assessments is useless without the context of a kid, so we make the assessment provider dynamic using a factory */

export const assessmentProviderFactory = (kid: Kid, database: AngularFireDatabase) => {
  return new AssessmentProvider(kid, database);
};

export const assessmentProvider = {
  provide: AssessmentProvider,
  useFactory: assessmentProviderFactory,
}
