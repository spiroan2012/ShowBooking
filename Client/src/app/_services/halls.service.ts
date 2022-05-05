import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs-compat/operator/retry';
import { first, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hall } from '../_models/hall';
import { HallParams } from '../_models/hallParams';
import { User } from '../_models/user';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class HallsService {
  baseUrl = environment.apiUrl;
  halls: Hall[] = [];
  user: User;
  hallParams: HallParams;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
    this.hallParams = new HallParams();
   }

  getHallParams(){
    return this.hallParams;
  }

  getHall(hallId: number){
    return this.http.get<Hall>(this.baseUrl+'halls/'+hallId);
  }

  setHallParams(hallParams: HallParams){
    this.hallParams = hallParams;
  }

  getHallsWithoutPagination(){
    return this.http.get<Hall[]>(this.baseUrl+'halls/GetWithoutPagination').pipe( map((halls: Hall[]) => halls.map(hall => ({id: hall.id, name: hall.title}))));
  }

  getHalls(hallParams: HallParams){
    let params = getPaginationHeaders(hallParams.pageNumber, hallParams.pageSize);

    if(hallParams.searchTitle != ''){
      params = params.append('searchTitle', hallParams.searchTitle);
     }

     return getPaginatedResult<Hall[]>(this.baseUrl+'halls', params, this.http);
  }

  getHallById(hallId: string){
    return this.http.get<Hall>(this.baseUrl+'halls/'+hallId).pipe(first());
  }

  addShow(model: any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Hall>(this.baseUrl+'halls/add', model, httpOptions);
 }

 updateShow(model: any, showId: string){
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  return this.http.put<Hall>(this.baseUrl+'halls/'+showId, model, httpOptions);
 }
}
