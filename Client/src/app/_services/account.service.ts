import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentuserSource = new ReplaySubject<User>(1);
  currentUser = this.currentuserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl+'account/login', model).pipe(
      map((response: any) => {
        const user = response;

        if(user){
          this.setCurrentUser(user);

        }
      })
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl+'account/register', model).pipe(
      map((user: User) => {
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User){
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentuserSource.next(user);
  }

  getDecodedToken(token){
    return JSON.parse(atob(token.split('.')[1]));
  }
}
