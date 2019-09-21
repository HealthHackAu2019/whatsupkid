import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  async createUser(user): Promise<any> {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log('result: ', result);
  }

  async login(user): Promise<any> {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log('result: ', result);
      return result;
  }

}
