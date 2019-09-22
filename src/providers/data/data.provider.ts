import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';
import { Kid } from '../../models/kid.interface';
import { Assessment, MoodData, Mood, LocationData, Location, Reason, ReasonData } from '../../models/assesment.interface';
import { Loading } from 'ionic-angular';


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

  loading: Loading

  colors = [
    'yellow',
    'orange',
    'pink',
    'red',
    'green',
    'blue',
    'aqua',
    'darkBlue',
    'magenta',
    'brand'
  ]

  moodsData: MoodData[] = [
    {
      mood: Mood.HAPPY,
      img: 'assets/imgs/moods/Happy-100px-wide.png',
      label: 'Happy'
    },
    {
      mood: Mood.LOW,
      img: 'assets/imgs/moods/Bored-100px-wide.png',
      label: 'Bored'
    },
    {
      mood: Mood.WINCE,
      img: 'assets/imgs/moods/Unhappy-100px-wide.png',
      label: 'Unhappy'
    },
    {
      mood: Mood.GRIT,
      img: 'assets/imgs/moods/Annoyed-100px-wide.png',
      label: 'Annoyed'
    },
    {
      mood: Mood.CRY,
      img: 'assets/imgs/moods/Angry-100px-wide.png',
      label: 'Angry'
    },
    {
      mood: Mood.SCREAM,
      img: 'assets/imgs/moods/Sad-100px-wide.png',
      label: 'Sad'
    },
  ];

  

  locationData: LocationData[] = [
    {
      location: Location.FRONT_HEAD,
      img: 'assets/imgs/location/Front-Head.png',
      label: 'Front Head'
    },
    {
      location: Location.FRONT_BODY_ARMS,
      img: 'assets/imgs/location/Front-Torso.png',
      label: 'Front Body & Arms'
    },
    {
      location: Location.FRONT_LEGS,
      img: 'assets/imgs/location/Front-Legs.png',
      label: 'Front Legs'
    },
    {
      location: Location.BACK_HEAD,
      img: 'assets/imgs/location/Back-Head.png',
      label: 'Back Head'
    },
    {
      location: Location.BACK_BODY_ARMS,
      img: 'assets/imgs/location/Back-Torso.png',
      label: 'Back Body & Arms'
    },
    {
      location: Location.BACK_LEGS,
      img: 'assets/imgs/location/Back-Legs.png',
      label: 'Back Legs'
    },
  ]

  reasonData: ReasonData[] = [
    {
      reason: Reason.COLD,
      img: 'assets/imgs/reasons/feels-cold.png',
      label: 'COLD'
    },
    {
      reason: Reason.HOT,
      img: 'assets/imgs/reasons/feels-heat.png',
      label: 'HOT'
    },
    {
      reason: Reason.HOME_SICK,
      img: 'assets/imgs/reasons/needs-family.png',
      label: 'HOME_SICK'
    },
    {
      reason: Reason.HUNGRY,
      img: 'assets/imgs/reasons/needs-food.png',
      label: 'HUNGRY'
    },
    {
      reason: Reason.WASH,
      img: 'assets/imgs/reasons/needs-wash.png',
      label: 'Wash Me'
    },
    {
      reason: Reason.TOILET,
      img: 'assets/imgs/reasons/needs-bathroom.png',
      label: 'TOILET'
    },
  ]

  constructor(private database: AngularFireDatabase) {
    this.loadKids() // Can load kids straight away as there's no data dep
  }

  update(entity: any, key: string, value: any) {
    entity[key] = value
    entity.$ref.update({ [key]: value })
  }

  /*🐱‍👤 Kid stuff */

  async getKid (userId: string): Promise<Kid> {
    const kidObservable = this.database
    .list('kids', ref => ref.orderByChild('userId').equalTo(userId).limitToFirst(1))
    .snapshotChanges()
    .pipe(
      map(snapshots => snapshots.map((action: any): Kid => {
        return {
          $ref: action.payload.ref,
          $key: action.payload.key,
          ...action.payload.val(),
        }
      }))
    )
    const [kid] = await this.resolveObservable(kidObservable)

    return kid
  }

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

  activateKid(kid: Kid) {
    this.activeKid = kid
  }

  async addKid (userId: string, colour: string): Promise<Kid> {
    const kid = {
      createDate: new Date().toString(),
      name: "Unnamed",
      userId,
      colour,
      spiritEmoji: '🐱‍👤'
    }

    const ref = await this.kidsRef.push(kid)

    return {
      ...kid,
      $ref: ref,
      $key: ref.key
    }
  }

  /*💠 Assessment Stuff */

  loadAssessments () {
    if (!this.activeKid) {
      throw new Error('Must have an active kid to load assessments. Call dataProvider.activateKid(kid) first')
    }

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

  activateAssessment(assessment: Assessment) {
    this.activeAssessment = assessment
  }

  async addAssessment() {
    const assessment: Assessment = {
      createDate: new Date().toString(),
      kidId: this.activeKid.$key,
      mood: this.moodsData[1].mood,
	    location: this.locationData[1].location,
	    reason: this.reasonData[1].reason
    }

    const ref = await this.assessmentsRef.push(assessment)

    return {
      ...assessment,
      $ref: ref,
      $key: ref.key
    }
  }

  resolveObservable<T>(observable: Observable<T>): Promise<T> {
    return new Promise(resolve => observable.subscribe(results => resolve(results)))
  }
}
