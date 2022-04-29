import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Booking } from '../_models/booking';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  baseUrl = environment.apiUrl;
  user: User;
  bookings: Booking[] = [];

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
   }

   getBookingsForShow(showId, date){
      let params = new HttpParams();
      let myDate  = new Date(date);
      var givenDate = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate();
      params = params.append('showId', showId);
      params = params.append('date', givenDate);
      return this.http.get<Booking[]>(this.baseUrl+'booking/GetBookingsForShowAndDate', {params: params});
   }
}
