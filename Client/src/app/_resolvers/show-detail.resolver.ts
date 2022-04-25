import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Show } from '../_models/show';
import { ShowsService } from '../_services/shows.service';

@Injectable({
  providedIn: 'root'
})
export class ShowDetailResolver implements Resolve<Show> {
  constructor(private showService: ShowsService){}

  resolve(route: ActivatedRouteSnapshot): Observable<Show> {
    return this.showService.getShow(parseInt(route.paramMap.get('id')));
  }
}
