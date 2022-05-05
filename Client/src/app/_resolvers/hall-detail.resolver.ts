import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Hall } from '../_models/hall';
import { HallsService } from '../_services/halls.service';

@Injectable({
  providedIn: 'root'
})
export class HallDetailResolver implements Resolve<Hall> {
  constructor(private hallService: HallsService){}

  resolve(route: ActivatedRouteSnapshot): Observable<Hall> {
    return this.hallService.getHall(parseInt(route.paramMap.get('id')));
  }
}
