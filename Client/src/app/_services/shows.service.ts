import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Show } from '../_models/show';
import { ShowCreate } from '../_models/showCreate';
import { ShowParams } from '../_models/showParams';
import { ShowSeat } from '../_models/showSeat';
import { User } from '../_models/user';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  baseUrl = environment.apiUrl;
  shows: Show[] = [];
  user: User;
  showParams: ShowParams;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
    this.showParams = new ShowParams();
   }

   getShowsParams(){
     return this.showParams;
   }

   setShowsParams(showParams: ShowParams){
     this.showParams = showParams;
   }

   getShows(showParams: ShowParams){
     let params = getPaginationHeaders(showParams.pageNumber, showParams.pageSize);

     if(showParams.searchTitle != ''){
      params = params.append('searchTitle', showParams.searchTitle);
     }
     

     return getPaginatedResult<Show[]>(this.baseUrl+'show', params, this.http)
      .pipe(map(response =>{
        return response;
      }))
   }

   getShow(showId: number){
     return this.http.get<Show>(this.baseUrl+'show/'+showId);
   }

   getSeatsOfShow(model: any): Observable<ShowSeat[]>{
    let params = new HttpParams();
    let myDate = new Date(model.showDate);
    var dar = myDate.getDate()+'/'+(myDate.getMonth()+1)+'/'+myDate.getFullYear();
    params = params.append('showId', model.showId.toString());
    params = params.append('showDate', dar);
    return this.http.get<ShowSeat[]>(this.baseUrl+'show/GetSeatsOfShow', {params:params})
   }

   getShowsForDate(dateOfShow: any){
     let params = new HttpParams();
     let givenDate = new Date(dateOfShow);
     var datePassed = givenDate.getFullYear()+'-'+(givenDate.getMonth()+1)+'-'+givenDate.getDate();
     params = params.append('dateGiven', datePassed);
     return this.http.get<Show[]>(this.baseUrl+'show/GetShowsForDate', {params: params});
   }

   addShow(model: any){
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.post<ShowCreate>(this.baseUrl+'show/add', model, httpOptions);
   }

   updateShow(model: any, showId: string){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put<ShowCreate>(this.baseUrl+'show/'+showId, model, httpOptions);
   }

   deleteShow(showId: number){
     return this.http.delete(this.baseUrl+'show/'+showId);
   }

   getShowById(id: string){
     return this.http.get<Show>(this.baseUrl+'show/'+id).pipe(first());
   }
}
