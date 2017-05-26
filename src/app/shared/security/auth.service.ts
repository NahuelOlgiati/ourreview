import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  authenticated$: Observable<boolean>;
  uid$: Observable<string>;

  constructor(public afAuth: AngularFireAuth) {
    this.authenticated$ = afAuth.authState.map(user => !!user);
    this.uid$ = afAuth.authState.map(user => user.uid);
  }

  signUp(email: string, password: string, callback: any): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(success => callback())
      .catch(error => callback(error));
  }

  signInWithEmailAndPassword(email: string, password: string, callback: any) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(success => callback())
      .catch(error => callback(error));
  }

  private signIn(provider: firebase.auth.AuthProvider, callback: any): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(success => callback())
      .catch(error => callback(error));
  }

  signInWithGithub(callback: any): firebase.Promise<any> {
    return this.signIn(new firebase.auth.GithubAuthProvider(), callback);
  }

  signInWithGoogle(callback: any): firebase.Promise<any> {
    return this.signIn(new firebase.auth.GoogleAuthProvider(), callback);
  }

  signInWithTwitter(callback: any): firebase.Promise<any> {
    return this.signIn(new firebase.auth.TwitterAuthProvider(), callback);
  }

  signInWithFacebook(callback: any): firebase.Promise<any> {
    return this.signIn(new firebase.auth.FacebookAuthProvider(), callback);
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

  resetPasswordEmail(email: string, callback: any) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(success => callback())
      .catch(error => callback(error));
  }

  readUser(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  updateUser(formData, callback: any) {
    return this.afAuth.authState.subscribe(authState => {
      authState.updateEmail(formData.value.email).then(success => {
        return authState.updateProfile({
          displayName: formData.value.displayName,
          photoURL: ''
        });
      }, callback())
        .catch(error => callback(error));
    });
  }

  deleteUser(callback: any) {
    return this.afAuth.authState.subscribe(authState => {
      authState.delete()
        .then(success => callback())
        .catch(error => callback(error));
    });
  }
}
