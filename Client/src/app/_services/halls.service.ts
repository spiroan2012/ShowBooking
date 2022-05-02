import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs-compat/operator/retry';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hall } from '../_models/hall';
import { HallParams } from '../_models/hallParams';
import { User } from '../_models/user';
import { AccountService } from './account.service';

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
    //this.showParams = new ShowParams();
   }

  getHallParams(){
    return this.hallParams;
  }

  setShowsParams(hallParams: HallParams){
    this.hallParams = hallParams;
  }

  getHallsWithoutPagination(){
    return this.http.get<Hall[]>(this.baseUrl+'halls/GetWithoutPagination').pipe( map((halls: Hall[]) => halls.map(hall => ({id: hall.id, name: hall.title}))));
  }
}
