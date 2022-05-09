import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable, ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { SocialAuthService } from 'angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentuserSource = new ReplaySubject<User>(1);
  currentUser = this.currentuserSource.asObservable();

  constructor(private http: HttpClient, private socialAuthService: SocialAuthService) { }

  login(model: any){
    return this.http.post(this.baseUrl+'account/login', model).pipe(
      map((response: any) => {
        const user = response;

        if(user && !user.isDisabled){
          this.setCurrentUser(user);

        }
        return user;
      })
    )
  }

  logout(){
    this.socialAuthService.signOut(true);
    localStorage.removeItem('user');
    this.currentuserSource.next(undefined);
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

  loginExternal(user){
    console.log("external");
    return this.http.post<User>(this.baseUrl+'account/facebook-login', user).pipe(
      map((user: User) => {
        if(user){
          this.setCurrentUser(user);
        }
        return user;
      })
    );
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
