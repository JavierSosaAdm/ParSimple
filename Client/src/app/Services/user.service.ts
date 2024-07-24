import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, from, map, throwError, catchError } from 'rxjs';
import { enviroment } from '../../enviroments/enviroments';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { v4 as uuidV4 } from 'uuid';
import { doc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  users: Observable<{id: string, data: User}[]>;
  private _http = inject(HttpClient);
  private baseURL: string = enviroment.apiURL
  private storage: AngularFireStorage;
  private firestore: AngularFirestore;
  private userCollection: AngularFirestoreCollection<User>;
  

  constructor(storage: AngularFireStorage, firestore: AngularFirestore) {
    
    this.storage = storage;
    this.firestore = firestore;
    this.userCollection = firestore.collection<User>('user');
    this.users = this.userCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<User>[]) => 
        actions.map((a) => {
          const { payload } = a;
          const data = payload.doc.data() as User;
          const id = payload.doc.id;
          return { id, data };
        }))
    );
    
  }
  postUser(data: User): Observable<User> {
    console.log(data);
    return this._http.post<User>(`${this.baseURL}/users`, data)
  }
  postUserFire(user: User): Observable<void> {
    return from(this.firestore.collection('user').doc(user.uid || uuidV4()).set(user))
    .pipe(
      catchError((err) => {
        console.log('Error al crear usuario en Firestore:', err);
        return throwError(err);
      })
    )
  }
  
  getUsers(): Observable<{data: User, id: string}[]> {
    return this.users
  }

  async getUserByEmail(email: string) {
    return await this.userCollection.ref.where('email', '==', email)
    .get()
  }

  updateUser(id: string) {
    
  };
}
