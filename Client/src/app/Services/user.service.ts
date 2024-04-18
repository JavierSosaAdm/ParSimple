import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroments';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _http = inject(HttpClient);
  private baseURL: string = enviroment.apiURL

  postUser(data: User): Observable<User> {
    console.log(data);
    return this._http.post<User>(`${this.baseURL}/users`, data)
  }
}
