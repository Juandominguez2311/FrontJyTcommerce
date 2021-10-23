import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from '../models/user.interface'



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) { }
  
/*async loginGoogle(): Promise<any> {
  try {
    const { user } = await this.afAuth.signInWithPopup(
      new auth.GoogleAuthProvider()
    )
  } catch (error) {
    console.log(error);
  }
}*/
}