import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { UserParams } from '../_models/urerParams';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  user:User;
  userParams: UserParams;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
   }

   getUserParams(){
     return this.userParams;
   }

   setUserParams(params: UserParams){
     this.userParams = params;
   }

   resetUserParams(){
     this.userParams = new UserParams(this.user);
     return this.userParams;
   }

  getUserWithRoles(userParams: UserParams){
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('searchUsername', userParams.searchUsername);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Partial<User[]>>(this.baseUrl+'admin/users-with-roles', params, this.http)
      .pipe(map(response => {
        return response;
      }))
    //return this.http.get<Partial<User[]>>(this.baseUrl+'admin/users-with-roles');
  }

  changeUserStatus(username: string){
    return this.http.post(this.baseUrl+'admin/change-status/'+username, {});
  }

  updateUserRoles(username: string, roles: string[]){
    return this.http.post(this.baseUrl+'admin/edit-roles/'+username+'?roles='+roles, {})
  }
}
