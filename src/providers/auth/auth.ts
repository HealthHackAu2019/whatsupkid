import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  user: firebase.User;
  
  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
    afAuth.user.subscribe((user) => {
      this.user = user;
    });
  }

  async createUser(user) {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log('result: ', result);
      return result
  }

  async login(user) {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log('result: ', result);
      return result;
  }

  async loginAnonymously() {
    const result = await this.afAuth.auth.signInAnonymously();
    console.log('result: ', result);
    return result;
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  currentUser() {
    return this.user;
  }

  isCurrentUserAnonymous(): boolean {
    return this.user ? this.user.isAnonymous : false
  }

}
