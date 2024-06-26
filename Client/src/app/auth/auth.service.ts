import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserCredential } from '@firebase/auth-types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  router = inject(Router);

  getAuth() {
    return getAuth();
  }

  singIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  async createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }
}
