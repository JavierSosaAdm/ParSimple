import { Injectable, OnInit, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserCredential } from '@firebase/auth-types';
// import { authState } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  currentUser: User [] = [];
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  router = inject(Router);
  // users = authState(this.auth)
  getAuth() {
    return getAuth();
  }
  ngOnInit(): void {
    // this.currentUser = this.getAuth.getCurrentUser();
  }

  singIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password); 
  }

  async createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }

  // getCurrentUser(): User | null{
  //   return this.auth().currentUser
  // }
}
